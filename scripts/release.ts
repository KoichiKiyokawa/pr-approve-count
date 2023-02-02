import bumpp from "bumpp";
import { execSync } from "child_process";
import { name, version } from "../package.json";

(async () => {
  await bumpp();
  execSync("pnpm run build");
  // enable to match zip folder name with unzip folder name
  execSync(`cp -r dist ${name} && zip -r ${name}.zip ${name}/ && rm -rf ${name}`);
  execSync(`gh release create v${version} ${name}.zip --title '' --notes ''`, { stdio: "inherit" });
})();
