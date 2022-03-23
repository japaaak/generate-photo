import fs from "fs";
import os from "os";
import { createCanvas, loadImage, registerFont } from "canvas";
import QRCode from "qrcode";
import readlineSync from "readline-sync";

registerFont("Antonio-Bold.ttf", { family: "Antonio" });

console.log("Hi, バナー作成開始するよ！", os.EOL, os.EOL);
const job_type = readlineSync.question("職種を教えて: ");
console.log(`->${job_type} だね、OK!`, os.EOL);
const salary = readlineSync.question(`${job_type}の給料はいくらかな?: `);
console.log(`->${salary}だね！`, os.EOL);
const province = readlineSync.question(
  `${job_type}の勤務地（都道府県）を教えて！: `
);
console.log(os.EOL);
const city = readlineSync.question(`${province}の何市かな？: `);
console.log(`->${province}の${city}だね！`, os.EOL);
const url = readlineSync.question("最後に求人ページのURL教えて！: ");
console.log(os.EOL, os.EOL, "Nice! ちょっと待ってね!", os.EOL);

const width = 1080;
const height = 1080;

const canvas = createCanvas(width, height);
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
const qrcanvas = createCanvas(180, 180);
const qroptions = {
  color: {
    dark: "#FFF",
    light: "#3696DE",
  },
};
QRCode.toCanvas(qrcanvas, url, qroptions, function (error) {
  context.drawImage(qrcanvas, 360, 610, 180, 180);
});
/* ------- */

// Footer
loadImage("./footer.jpg").then((image) => {
  context.drawImage(image, 0, 1080 - 220, 1080, 220);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./test.png", buffer);
});
/* ------- */

console.log("バナー完成したよ！");
