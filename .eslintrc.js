module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {},
    "ignorePatterns": ["node_modules", "examples", "website", "scripts"],
    "globals": {
        "BigInt": true
    }
};
