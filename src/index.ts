import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Plugin } from "esbuild";

interface EmbedFilePluginOptions {
  cwd?: string; // Base directory for resolving file paths
  match?: (filePath: string) => boolean; // Function to decide whether to embed a file
}

export function EmbedFilePlugin(options: EmbedFilePluginOptions = {}): Plugin {
  const { cwd = ".", match = () => true } = options;

  return {
    name: "embed-file-plugin",
    setup(build) {
      const readFileSyncPattern =
        /(?:fs\.)?readFileSync\s*\(\s*(['"`])(.+?)\1\s*\)/g;

      build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
        let contents = await readFile(args.path, "utf-8");

        contents = contents.replace(
          readFileSyncPattern,
          (fullMatch, _quote, filePath) => {
            const absolutePath = resolve(cwd, filePath);

            // Check if the file should be embedded
            if (!match(filePath)) {
              return fullMatch; // Leave the call unchanged
            }

            try {
              const fileContent = readFileSync(absolutePath, "utf-8");
              return JSON.stringify(fileContent); // Replace with the file content as a string
            } catch (error) {
              console.error(`Error reading file: ${absolutePath}`);
              throw error;
            }
          },
        );

        return { contents, loader: "default" };
      });
    },
  };
}

export { EmbedFilePlugin as default };
