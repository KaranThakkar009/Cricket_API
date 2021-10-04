const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db.collection("sponsor").find({}).toArray();
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

router.post("/addSponsor", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("sponsor").insertOne({
      sponsor_id: req.body.sponsor_id,
      sponsor_name: req.body.sponsor_name,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateSponsor/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("sponsor").updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          sponsor_name: req.body.sponsor_name,
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
  "/deleteSponsor/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("sponsor")
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
