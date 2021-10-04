const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

// get players request
router.get("/", async (req, res) => {
  try {
    const result = await db.collection("player").find({}).toArray();
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

router.post("/addPlayer", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("player").insertOne({
      p_id: req.body.p_id,
      player_type_id: req.body.player_type_id,
      team_id: req.body.team_id,
      nationality: req.body.nationality,
      player_name: req.body.player_name,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updatePlayer/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("player").updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          nationality: req.body.nationality,
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
  "/deletePlayer/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("player")
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
