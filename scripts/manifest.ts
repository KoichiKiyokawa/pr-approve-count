import fs from "node:fs";
import path from "node:path";
import { name, version } from "../package.json";

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name,
  version,
  content_scripts: [
    {
      matches: ["https://github.com/*"],
      js: ["content.js"],
    },
  ],
};

fs.writeFileSync(
  path.resolve(__dirname, `../dist/manifest.json`),
  JSON.stringify(manifest, null, 2)
);
