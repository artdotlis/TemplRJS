export default {
    entry: ['runtime/index.html', 'runtime/ts/index.ts'],
    project: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,mdx,md,html}'],
    ignore: ['eslint.config.mjs'],
    ignoreBinaries: ['knip', 'eslint', 'tsc', 'vite'],
    ignoreDependencies: ['katex', 'sass', '@antfu/eslint-config', /^@?eslint.*/],
    compilers: {
        css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
    },
};
