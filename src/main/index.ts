import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
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
    alwaysOnTop: true,
    frame: false,
    transparent: true,

    x: 40,
    y: 40,

    movable: true,
    resizable: false,
    minimizable: false,

    // show: false,
  });

  win.loadFile(path.join(__dirname, "..", "..", "public", "index.html"));
}

app.whenReady().then(createWindow);

ipcMain.once("close", app.quit);

ipcMain.once("set-size", (event, size) => {
  const win = BrowserWindow.fromWebContents(event.sender) as BrowserWindow;
  console.log(size);
  win.setSize(size.width, size.height);
});
