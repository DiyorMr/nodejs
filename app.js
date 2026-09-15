import os from "os";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemInfo = `
Platforma: ${os.platform()}
Arxitektura: ${os.arch()}
Papka: ${__dirname}
Fayl nomi: ${path.basename(__filename)}
Xotira: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
`;

const filePath = path.join(__dirname, "system-info.txt");

fs.writeFileSync(filePath, systemInfo);
console.log(chalk.green("Fayl yaratildi:"), filePath);