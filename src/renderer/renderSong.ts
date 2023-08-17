export type Line = {
  text: string;
  startsAt: number;
  duration: number;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  lines: Line[];
  progress: number;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${secondsString}`;
};

function renderSong(song: Song) {
  const appContainer = document.querySelector(".app-container")!;
  const songSPAN = document.querySelector(".app-header__song")!;

  songSPAN.textContent = `${song.title} - ${formatTime(song.progress)}`;
}

export default renderSong;
