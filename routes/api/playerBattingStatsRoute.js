const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db
      .collection("player_batting_stats")
      .find({})
      .toArray();
    console.log(result);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Fetched Successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post(
  "/addPlayerBattingStats",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("player_batting_stats").insertOne({
        player_batting_stats_id: req.body.player_batting_stats_id,
        p_id: req.body.p_id,
        match_id: req.body.match_id,
        player_runs: req.body.player_runs,
        player_boundaries: req.body.player_boundaries,
        strike_rate: req.body.strike_rate,
      });
      res.status(200).json({
        data: data,
        message: `Data created successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/updatePlayerBattingStats/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("player_batting_stats").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            strike_rate: req.body.strike_rate,
          },
        }
      );
      res.status(200).json({
        data: data,
        message: `Data updated successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/deletePlayerBattingStats/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("player_batting_stats")
        .deleteOne({ _id: ObjectID(req.params.id) });
      res.status(200).json({
        data: data,
        message: `Data Deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
