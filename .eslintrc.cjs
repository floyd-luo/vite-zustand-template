module.exports = {
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "eslint-config-umi"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            "jsx": true
        }
    },
    plugins: ['react-refresh', "react-hooks", "prettier", "react"],
    rules: {
        'react-refresh/only-export-components': 'warn',
        "prettier/prettier": "error",
        "no-unused-expressions": "off",
        "react/jsx-uses-react": "error",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/prefer-interface": "off"
    },
}
