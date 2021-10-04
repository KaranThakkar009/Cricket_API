const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db
      .collection("scorecard_by_match_innings")
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
  "/addScorecardByMatchInnings",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("scorecard_by_match_innings").insertOne({
        scorecard_id: req.body.scorecard_id,
        match_id: req.body.match_id,
        innings_no: req.body.innings_no,
        total_score: req.body.total_score,
        total_wickets: req.body.total_wickets,
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
  "/updateScorecardByMatchInnings/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("scorecard_by_match_innings").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            scorecard_by_match_innings: req.body.scorecard_by_match_innings,
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
  "/deleteScorecardByMatchInnings/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("scorecard_by_match_innings")
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
