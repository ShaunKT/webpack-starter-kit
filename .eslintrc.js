module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: ['airbnb-base','eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
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