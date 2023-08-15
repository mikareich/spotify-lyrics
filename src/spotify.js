require("dotenv").config();

const SpotifyWebApi = require("spotify-web-api-node");

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const CALLBACK_URL = `http://localhost:${PORT}/callback/`;

function getSpotifyAuthURL(
  scopes = ["user-read-playback-state", "user-read-currently-playing"]
) {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: CALLBACK_URL,
  });

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  return authorizeURL;
}

async function getSpotifyContent(code) {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: CALLBACK_URL,
  });

  return spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        const songName = data.body.item.name;
        const artistNames = data.body.item.artists.map((artist) => artist.name);
        const albumName = data.body.item.album.name;
        const albumCover = data.body.item.album.images[0].url;
        const trackId = data.body.item.id;

        console.log(trackId);

        fetch(`https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`)
          .then((res) => res.json())
          .then((data) => {
            const lyrics = data.lyric;
            const lyricsURL = data.url;

            console.log(lyrics);

            const songInfo = {
              songName,
              artistNames,
              albumName,
              albumCover,
              lyrics,
              lyricsURL,
            };

            return songInfo;
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getSpotifyAuthURL,
  getSpotifyContent,
};
