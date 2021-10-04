const express = require("express");

const router = express.Router();
const { ObjectID } = require("mongodb");
const { authToken } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

router.get("/", authToken, async (req, res, next) => {
  try {
    let data = await db.collection("ball").find({}).toArray();
    res.status(200).json({
      data: data,
      message: `Data Fetched Successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/addBall", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("ball").insertOne({
      ball_no: req.body.ball_no,
      match_id: req.body.match_id,
      over: req.body.over,
      runs_scored: req.body.runs_scored,
      wicket: req.body.wicket,
      extra: req.body.extra,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateBall/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("ball").updateOne(
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
});

router.delete("/deleteBall/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db
      .collection("ball")
      .deleteOne({ _id: ObjectID(req.params.id) });
    res.status(200).json({
      data: data,
      message: `Data Deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
