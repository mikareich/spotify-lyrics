import { BrowserWindow, app } from "electron";
import electronReloader from "electron-reloader";

try {
  electronReloader(module);
} catch (error) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 150,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // alwaysOnTop: true,
    frame: false,
    transparent: true,

    movable: true,
    resizable: false,
    minimizable: false,
  });

  win.loadFile("public/index.html");
}

app.whenReady().then(createWindow);
