const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db.collection("player_type").find({}).toArray();
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

router.post("/addPlayerType", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("player_type").insertOne({
      player_type_id: req.body.player_type_id,
      player_type: req.body.player_type,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/updatePlayerType/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db.collection("player_type").updateOne(
        { _id: ObjectID(req.params.id) },
        {
          $set: {
            player_type: req.body.player_type,
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
  "/deletePlayerType/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("player_type")
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
