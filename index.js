const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const config = require("config");
const auth = require("./routes/api/auth");
const players = require("./routes/api/playersRoute");
const matches = require("./routes/api/matchesRoute");
const teams = require("./routes/api/teamsRoute");
const balls = require("./routes/api/ballRoute");
const venue = require("./routes/api/venueRoute");
const sponsor = require("./routes/api/sponsorRoute");
const coach = require("./routes/api/coachRoute");
const battingScoreCard = require("./routes/api/battingScoreCardRoute");
const bowlingScoreCard = require("./routes/api/bowlingScoreCardRoute");
const owner = require("./routes/api/ownerRoute");
const playerBattingStats = require("./routes/api/playerBattingStatsRoute");
const playerBowlingStats = require("./routes/api/playerBowlingStatsRoute");
const playerType = require("./routes/api/playerTypeRoute");
const scoreCardByInnings = require("./routes/api/scoreCardByInningsRoute");
const { MongoClient } = require("mongodb");
const mongoUrl = config.get("MongoURL");

MongoClient.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((database) => {
    db = database.db("cricket");
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(`MongoDB Connection Error ${err}`);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(logger("common"));

app.use("/api/", auth);
app.use("/api/players/", players);
app.use("/api/matches/", matches);
app.use("/api/teams/", teams);
app.use("/api/venue/", venue);
app.use("/api/sponsor/", sponsor);
app.use("/api/coach/", coach);
app.use("/api/battingScoreCard/", battingScoreCard);
app.use("/api/bowlingScoreCard/", bowlingScoreCard);
app.use("/api/playerBattingStats", playerBattingStats);
app.use("/api/playerBowlingStats", playerBowlingStats);
app.use("/api/playerType", playerType);
app.use("/api/scoreCardByInnings", scoreCardByInnings);

app.listen(5000, () => {
  console.log("SERVER IS RUNNING ON localhost:5000");
});

module.exports = app;
