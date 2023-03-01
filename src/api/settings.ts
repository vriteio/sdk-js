import { SendRequestFunction } from "./request";

interface Settings {
  /**
   * UI Theme
   */
  uiTheme: "light" | "dark" | "auto";
  /**
   * Code editor theme
   */
  codeEditorTheme: "light" | "dark" | "auto";
  /**
   * Prettier configuration object (https://prettier.io/docs/en/options.html)
   */
  prettierConfig: Partial<{
    printWidth: number;
    tabWidth: number;
    useTabs: boolean;
    semi: boolean;
    singleQuote: boolean;
    jsxSingleQuote: boolean;
    trailingComma: "none" | "es5" | "all";
    bracketSpacing: boolean;
    bracketSameLine: boolean;
    jsxBracketSameLine: boolean;
    rangeStart: number;
    rangeEnd: number;
    proseWrap: "always" | "never" | "preserve";
    arrowParens: "avoid" | "always";
    htmlWhitespaceSensitivity: "css" | "strict" | "ignore";
    endOfLine: "auto" | "lf" | "crlf" | "cr";
    quoteProps: "as-needed" | "consistent" | "preserve";
    vueIndentScriptAndStyle: boolean;
    embeddedLanguageFormatting: "auto" | "off";
    singleAttributePerLine: boolean;
  }>;
}

const createSettingsEndpoints = (sendRequest: SendRequestFunction) => {
  return {
    get: () => {
      return sendRequest<Settings>("GET", "/settings");
    },
    update: (input: Partial<Settings>) => {
      return sendRequest<Record<string, never>>("PUT", "/settings", {
        body: input,
      });
    },
  };
};

export { createSettingsEndpoints };
export type { Settings };
