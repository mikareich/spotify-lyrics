const { ipcRenderer } = require("electron");
const appContainer = document.querySelector(".app-container");
const closeButton = document.querySelector(".app-header__close");

window.addEventListener("load", () => {
  const { width, height } = appContainer.getBoundingClientRect();
  console.log(width, height);
  ipcRenderer.send("set-size", Math.round(width), Math.round(height));
});

closeButton.addEventListener("click", () => {
  ipcRenderer.send("close");
});
