require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    alwaysOnTop: true,
    frame: false,
    transparent: true,

    movable: true,
    resizable: false,
    minimizable: false,
  });

  win.loadFile(path.join(__dirname, "..", "public", "index.html"));
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.once("set-size", (e, width, height) => {
  if (!win) return;
  win.setSize(width, height);
});

ipcMain.once("close", app.quit);
