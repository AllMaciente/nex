import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL("http://localhost:5173"); // ou o caminho do seu HTML
}

app.whenReady().then(createWindow);
