"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const canvas_1 = require("canvas");
const qrcode_1 = __importDefault(require("qrcode"));
const readline_sync_1 = __importDefault(require("readline-sync"));
(0, canvas_1.registerFont)("Antonio-Bold.ttf", { family: "Antonio" });
console.log("Hi, バナー作成開始するよ！", os_1.default.EOL, os_1.default.EOL);
const job_type = readline_sync_1.default.question("職種を教えて: ");
console.log(`->${job_type} だね、OK!`, os_1.default.EOL);
const salary = readline_sync_1.default.question(`${job_type}の給料はいくらかな?: `);
console.log(`->${salary}だね！`, os_1.default.EOL);
const province = readline_sync_1.default.question(`${job_type}の勤務地（都道府県）を教えて！: `);
console.log(os_1.default.EOL);
const city = readline_sync_1.default.question(`${province}の何市かな？: `);
console.log(`->${province}の${city}だね！`, os_1.default.EOL);
const url = readline_sync_1.default.question("最後に求人ページのURL教えて！: ");
console.log(os_1.default.EOL, os_1.default.EOL, "Nice! ちょっと待ってね!", os_1.default.EOL);
const width = 1080;
const height = 1080;
const canvas = (0, canvas_1.createCanvas)(width, height);
const context = canvas.getContext("2d");
// job_type
context.fillStyle = "#3696DE";
context.fillRect(0, 0, width, height);
context.font = "Bold 48px Antonio";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillStyle = "#fff";
const textWidth = context.measureText(job_type).width;
context.fillRect((1080 - (textWidth + 60)) / 2, 98, textWidth + 60, 90);
context.fillStyle = "#3696DE";
context.fillText(job_type, 540, 140);
/* ------- */
// Salary
context.fillStyle = "#fff";
context.font = "Black 300px Antonio";
context.fillText(`¥${salary}`, 540, 380);
/* ------- */
// Locale
context.font = "Black 62px Antonio";
context.textAlign = "left";
context.fillText(province, 560, 660);
context.fillText(city, 560, 730);
/* ------- */
// QR
const qrcanvas = (0, canvas_1.createCanvas)(180, 180);
const qroptions = {
    color: {
        dark: "#FFF",
        light: "#3696DE",
    },
};
qrcode_1.default.toCanvas(qrcanvas, url, qroptions, function (error) {
    context.drawImage(qrcanvas, 360, 610, 180, 180);
});
/* ------- */
// Footer
(0, canvas_1.loadImage)("./footer.jpg").then((image) => {
    context.drawImage(image, 0, 1080 - 220, 1080, 220);
    const buffer = canvas.toBuffer("image/png");
    fs_1.default.writeFileSync("./test.png", buffer);
});
/* ------- */
console.log("バナー完成したよ！");
