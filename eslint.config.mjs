import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/apps/backend/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module"
    }
  },
  {
    files: ["src/apps/frontend/**/*.js"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "script"
    }
  },
  tseslint.configs.recommended,
]);
