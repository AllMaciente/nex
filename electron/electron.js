import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { PrismaClient } from "@prisma/client"; // Mudança para import
import dotenv from "dotenv";

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const prisma = new PrismaClient();

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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handlers para interagir com o banco de dados via Prisma
ipcMain.handle("fetch-requests", async () => {
  const users = await prisma.requests.findMany();
  return users;
});

ipcMain.handle("create-requests", async (event, userData) => {
  const newUser = await prisma.requests.create({
    data: userData,
  });
  return newUser;
});

ipcMain.handle("update-request", async (event, { name, data }) => {
  try {
    const updatedRequest = await prisma.requests.update({
      where: { name },
      data,
    });
    return updatedRequest;
  } catch (error) {
    console.error("Erro ao atualizar o request:", error);
    throw error;
  }
});
