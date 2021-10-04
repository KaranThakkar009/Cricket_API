const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db.collection("batting_scorecard").find({}).toArray();
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
  "/addBattingScoreCard",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("batting_scorecard").insertOne({
        batting_team_id: req.body.batting_team_id,
        scorecard_id: req.body.scorecard_id,
        runs_scored: req.body.runs_scored,
        balls: req.body.balls,
        fours: req.body.fours,
        sixes: req.body.sixes,
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
  "/updateBattingScoreCard/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("batting_scorecard").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            runs_scored: req.body.runs_scored,
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
  "/deleteBattingScoreCard/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("batting_scorecard")
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
