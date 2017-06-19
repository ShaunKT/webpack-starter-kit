module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: ['airbnb-base', 'plugin:react/recommended'],
    parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "modules": true,
        },
        "sourceType": "module"
    },
    plugins: [
        "react"
    ],
    rules: {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};