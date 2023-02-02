import { name, version } from "./package.json"
import fs from "node:fs"

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
}

fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifest))
