import type { PreviewOptions, ServerOptions, UserConfig } from 'vite';
import type { FromToEl } from './runtime/ts/@types/project';
import fs from 'node:fs';
import Path from 'node:path';
import * as process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import PROJECT from './runtime/ts/constants/project';

const ROOT = Path.resolve(__dirname, '../../');
const LOCAL_DIR = Path.resolve(__dirname);

function createCopyPath(): FromToEl[] {
    const path: FromToEl[] = [];
    for (const toCopy of [PROJECT.assets, PROJECT.plugins]) {
        for (const frTo of Object.values(toCopy)) {
            if (frTo === null || typeof frTo !== 'object') {
                continue;
            }
            if (!('to' in frTo && 'from' in frTo)) {
                continue;
            }
            if (typeof frTo.to !== 'string' || typeof frTo.from !== 'string') {
                continue;
            }
            path.push({
                from: frTo.from,
                to: frTo.to,
            });
        }
    }
    return path;
}

function getEnv(): string {
    return process.env.NODE_ENV ?? 'development';
}

const ENV = loadEnv(getEnv(), LOCAL_DIR, '') as {
    [key: string]: string;
    APP_PRES: string;
    CACHE_PRES_VITE: string;
};

const ENV_GL = loadEnv(getEnv(), ROOT, '') as {
    [key: string]: string;
    NGINX_PORT: string;
};

function getAppMain(): string {
    const main = process.env.APP_PRES_SHADOW ?? Path.resolve(ROOT, ENV.APP_PRES);
    return main;
}

const APP_DIR = getAppMain();
const CACHE_DIR = Path.resolve(ROOT, ENV.CACHE_PRES_VITE);

function copyFromTargets(): void {
    const targets = createCopyPath();
    fs.mkdirSync(APP_DIR, { recursive: true });
    for (const path of targets) {
        const realSrc = fs.lstatSync(path.from).isSymbolicLink()
            ? fs.realpathSync(path.from)
            : path.from;
        fs.cpSync(Path.resolve(LOCAL_DIR, realSrc), Path.resolve(APP_DIR, path.to), {
            recursive: true,
        });
    }
}

function createBuild(): UserConfig {
    return {
        build: {
            write: true,
            outDir: `../../${ENV.APP_PRES}`,
            assetsDir: './assets',
            assetsInlineLimit: 8 * 1024,
            cssCodeSplit: true,
            emptyOutDir: false,
            sourcemap: false,
            manifest: false,
            ssr: false,
            minify: 'esbuild' as const,
            cssMinify: true,
        },
    };
}
function getPort(): number {
    return Number.parseInt(process.env.NODE_PORT ?? '8080', 10);
}

function getNginxPort(): number {
    return Number.parseInt(ENV_GL.NGINX_PORT ?? '9080', 10);
}

function createShared(): UserConfig {
    return {
        root: './',
        envDir: LOCAL_DIR,
        base: '/',
        appType: 'spa' as const,
        cacheDir: CACHE_DIR,
        envPrefix: 'VITE_',
        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '.js'],
        },
        json: {
            stringify: true,
            namedExports: false,
        },
        assetsInclude: [
            '**/*.woff2?',
            '**/*.eot',
            '**/*.ttf',
            '**/*.otf',
            '**/*.jpe?g',
            '**/*.png',
            '**/*.svg',
            '**/*.webp',
        ],
        logLevel: 'info' as const,
        clearScreen: false,
    };
}

function createDefaultServer(): PreviewOptions | ServerOptions {
    return {
        host: '0.0.0.0',
        port: getPort(),
        strictPort: true,
        fs: { strict: false },
        hmr: {
            clientPort: getNginxPort(),
            path: '/_ws',
        },
    };
}

function createPreview(): UserConfig {
    return { preview: createDefaultServer() };
}

function createServer(): UserConfig {
    return {
        server: {
            ...createDefaultServer(),
            watch: {
                ignored: ['**/node_modules/**'],
            },
        },
        publicDir: APP_DIR,
    };
}

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    console.log(ROOT, command, `MODE: ${mode}`, isSsrBuild, isPreview);
    console.log('NODE_ENV:', getEnv());
    copyFromTargets();
    let [preview, server] = [{}, {}];
    if (command === 'serve' && !(isPreview ?? false)) {
        server = createServer();
        console.log(server);
    }
    if (isPreview ?? false) {
        preview = createPreview();
        console.log(preview);
    }
    const config: UserConfig = {
        plugins: [
            {
                name: 'full-reload',
                handleHotUpdate: ({ server }) => {
                    void server.restart();
                    return [];
                },
            },
        ],
        ...createShared(),
        ...createBuild(),
        ...server,
        ...preview,
    };
    return config;
});
