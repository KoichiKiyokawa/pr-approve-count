import { execSync } from "child_process";
import { version } from "../package.json";
import bumpp from "bumpp";

const outputZipFilename = "./pr-approve-count.zip";

(async () => {
  execSync(`zip -r ${outputZipFilename} dist/`);
  await bumpp();
  execSync("pnpm run build");
  execSync(`gh release create v${version} ${outputZipFilename}`);
})();
