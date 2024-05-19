import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser, process: "readonly" },
    ignores: ["**/node_modules/", ".dist/"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
