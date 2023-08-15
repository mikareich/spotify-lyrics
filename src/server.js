const express = require("express");
const app = express();
const { getSpotifyAuthURL, getSpotifyContent } = require("./spotify");
const PORT = process.env.PORT || 3000;

function startServer() {
  app.get("/", (req, res) => {
    res.redirect(getSpotifyAuthURL());
  });

  app.get("/callback", (req, res) => {
    console.log(req.query.code);

    getSpotifyContent(req.query.code).then((data) => {
      console.log(data);
      res.send("Hello World!");
    });
  });

  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

module.exports = startServer;
