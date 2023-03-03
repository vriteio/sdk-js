import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [{ input: "./src/api" }, { input: "./src/transformers" }],
  declaration: true,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
});
