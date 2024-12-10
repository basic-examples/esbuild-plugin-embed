import { build } from "esbuild";
import EmbedFilePlugin from "esbuild-plugin-embed/src";

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/bundle.js",
  bundle: true,
  plugins: [
    EmbedFilePlugin({
      cwd: "assets",
      match: (filePath) => filePath.endsWith(".md"), // Only embed .md files
    }),
  ],
  platform: "node",
}).catch(() => process.exit(1));
