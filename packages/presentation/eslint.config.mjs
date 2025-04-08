import antfu from '@antfu/eslint-config';
import * as tsResolver from 'eslint-import-resolver-typescript';

export default antfu(
    {
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
        typescript: {
            tsconfigPath: 'tsconfig.json',
        },
        jsonc: true,
        yaml: true,
        ignores: ['**/public', '**/assets'],
    },
    {
        rules: {
            'no-console': 'warn',
            'no-alert': 'warn',
        },
        settings: {
            'import-x/resolver': {
                name: 'tsResolver',
                resolver: tsResolver,
                options: { alwaysTryTypes: true, project: 'tsconfig.json' },
            },
        },
    }
);
