require("dotenv").config();

const { app, BrowserWindow } = require("electron");
const startServer = require("./server");

const { connectSpotify } = require("./spotify");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundThrottling: false,
  });

  win.loadFile("../public/index.html");

  connectSpotify();
};

app.whenReady().then(() => {
  createWindow();
  startServer();
});
