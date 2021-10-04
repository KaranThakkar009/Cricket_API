const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db.collection("bowling_scorecard").find({}).toArray();
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
  "/addBowlingScoreCard",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("bowling_scorecard").insertOne({
        bowling_team_id: req.body.bowling_team_id,
        scorecard_id: req.body.scorecard_id,
        overs: req.body.overs,
        maidens: req.body.maidens,
        wicket_taken: req.body.wicket_taken,
        runs_given: req.body.runs_given,
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
  "/updateBowlingScoreCard/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("bowling_scorecard").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            runs_given: req.body.runs_given,
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
  "/deleteBowlingScoreCard/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("bowling_scorecard")
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
