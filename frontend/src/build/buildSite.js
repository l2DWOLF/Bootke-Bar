import fs from "fs";
import { generateHome } from "./generateHome.js";
import { generateMenu } from "./generateMenu.js";

if (!fs.existsSync("dist")){
    fs.mkdirSync("dist");
};

fs.writeFileSync("dist/index.html", generateHome());
fs.writeFileSync("dist/menu-he.html", generateMenu("he"));
fs.writeFileSync("dist/menu-en.html", generateMenu("en"));

fs.copyFileSync(
    "public/main.css",
    "dist/main.css"
);
console.log("Site built successfully 🚀");