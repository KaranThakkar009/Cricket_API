const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

// get matches request
router.get("/", async (req, res) => {
  try {
    const result = await db.collection("match").find({}).toArray();
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

router.post("/addMatch", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("match").insertOne({
      match_id: req.body.match_id,
      venue_id: req.body.venue_id,
      match_date: req.body.match_date,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateMatch/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("match").updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          match_date: req.body.match_date,
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

router.delete(
  "/deleteMatch/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("match")
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
