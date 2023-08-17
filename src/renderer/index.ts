import { ipcRenderer } from "electron";
import renderSong, { Song } from "./renderSong.js";
import OBERKOERPERFREI from "./Oberkoerperfrei.js";

const appContainer = document.querySelector(".app-container")!;
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("set-size", {
    width: appContainer.clientWidth,
    height: appContainer.clientHeight,
  });
});

const closeButton = document.querySelector(".app-header__close")!;
closeButton.addEventListener("click", () => {
  ipcRenderer.send("close");
});

renderSong(OBERKOERPERFREI);
