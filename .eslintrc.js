module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/recommended', '@vue/prettier', '@vue/typescript', 'plugin:prettier/recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': ['error', { singleQuote: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
