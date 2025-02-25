const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        rules: {
            ...prettier.rules,
            'prettier/prettier': ['error'],
        },
        plugins: {
            prettier: pluginPrettier,
        },
    },
];
