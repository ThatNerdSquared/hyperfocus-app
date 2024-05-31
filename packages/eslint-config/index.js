import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConf = [
    {
        languageOptions: { globals: globals.browser },
        rules: {
            "no-await-in-loop": "warn",
            "no-duplicate-imports": "error",
            "no-self-compare": "error",
            "no-template-curly-in-string": "error",
            "no-unreachable-loop": "error",
            "prefer-promise-reject-errors": "error",
            yoda: "warn",
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error",
        },
        ignorePatterns: ["dist"],
        parser: parser,
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    eslintConfigPrettier,
];

export default eslintConf;
