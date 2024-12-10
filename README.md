# esbuild-embed-file-plugin

A custom **esbuild plugin** to replace `readFileSync(SOME_STRING_LITERAL)` calls in your JavaScript/TypeScript code with the file's embedded content at build time.

This is useful for embedding static files (like `.txt`, `.json`, or `.md`) directly into your bundled output, reducing runtime dependencies on the filesystem.

## Features

- Replace `readFileSync` calls with file content at build time.
- Supports embedding any file type.
- Configurable options:
  - **Base directory (`cwd`)** for resolving file paths.
  - **Custom `match` function** to decide which files to embed.
- Works with both JavaScript and TypeScript projects.

## Installation

```bash
npm install esbuild-plugin-embed
```

## Usage

### Setup the Plugin

Include the plugin in your esbuild configuration:

```typescript
import esbuild from "esbuild";
import EmbedFilePlugin from "esbuild-plugin-embed";

esbuild
  .build({
    entryPoints: ["src/index.ts"], // Entry file for your project
    outfile: "dist/bundle.js", // Output file
    bundle: true,
    plugins: [
      EmbedFilePlugin({
        cwd: ".", // Base directory for resolving file paths (default: current directory)
        match: (filePath) => filePath.endsWith(".md"), // Embed only .md files
      }),
    ],
    platform: "node",
  })
  .catch(() => process.exit(1));
```

### Example Code

In your source code (`src/index.ts`):

```typescript
import fs from "fs";

// This will be replaced with the content of README.md
const readmeContent = fs.readFileSync("README.md");

console.log(readmeContent);
```

If `README.md` contains:

```md
# Example Project

This is an example README.
```

The output will look like this after bundling:

```javascript
const readmeContent = "# Example Project\n\nThis is an example README.\n";
console.log(readmeContent);
```

## Plugin Options

### `cwd` (optional)

Specifies the base directory for resolving file paths. Defaults to the current directory (`"."`).

Example:

```typescript
embedFilePlugin({ cwd: "./src" });
```

### `match` (optional)

A function to determine which files should be embedded. It takes the file path as input and should return a boolean (`true` to embed, `false` to skip). Defaults to embedding all files.

Example:

```typescript
embedFilePlugin({
  match: (filePath) => filePath.endsWith(".txt"), // Embed only .txt files
});
```

## Why Use This Plugin?

1. Embed static files into your bundled code to eliminate runtime file dependencies.
2. Customize the embedding behavior with minimal configuration.
3. Simplify distribution by bundling everything into a single file.

## License

MIT

## Contributing

Feel free to open issues or submit pull requests to improve this plugin. Contributions are always welcome!
