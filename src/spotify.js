require("dotenv").config();

const SpotifyWebApi = require("spotify-web-api-node");

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const CALLBACK_URL = `http://localhost:${PORT}/callback/`;

function connectSpotify() {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: CALLBACK_URL,
  });

  const scopes = ["user-read-playback-state", "user-read-currently-playing"];

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
}

module.exports = {
  connectSpotify,
};
