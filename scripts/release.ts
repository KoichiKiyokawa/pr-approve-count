import { execSync } from "child_process";

(async () => {
  const { name, version } = await import("../package.json");
  // enable to match zip folder name with unzip folder name
  execSync(`cp -r dist ${name} && zip -r ${name}.zip ${name}/ && rm -rf ${name}`);
  execSync(`gh release create v${version} ${name}.zip --title '' --notes ''`, { stdio: "inherit" });
})();
