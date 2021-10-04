const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db
      .collection("player_bowling_stats")
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
  "/addPlayerBowlingStats",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("player_bowling_stats").insertOne({
        player_bowling_stats_id: req.body.player_bowling_stats_id,
        p_id: req.body.p_id,
        match_id: req.body.match_id,
        over_bowled: req.body.over_bowled,
        wicket_taken: req.body.wicket_taken,
        maidens: req.body.maidens,
        economy: req.body.economy,
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
  "/updatePlayerBowlingStats/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("player_bowling_stats").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            economy: req.body.economy,
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
  "/deletePlayerBowlingStats/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("player_bowling_stats")
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
