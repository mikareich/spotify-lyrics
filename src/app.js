require("dotenv").config();

const { app, BrowserWindow } = require("electron");
const startServer = require("./server");

const { connectSpotify } = require("./spotify");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 250,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    resizable: false,
    transparent: true,
  });

  win.loadFile("public/index.html");
  win.setAlwaysOnTop(true, "screen-saver");

  connectSpotify();
};

app.whenReady().then(() => {
  createWindow();
  startServer();
});
