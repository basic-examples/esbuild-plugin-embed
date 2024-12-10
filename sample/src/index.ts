import { readFileSync } from "fs";

// This will be replaced with the contents of README.md
const readmeContent = readFileSync("README.md");

// This will not be replaced if the match function excludes it
const otherContent = readFileSync("other.txt");

console.log(readmeContent);
