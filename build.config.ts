import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/api/index"],
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
