const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

router.get("/", authToken, async (req, res) => {
  try {
    const result = await db.collection("owner").find({}).toArray();
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

router.post("/addOwner", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("owner").insertOne({
      owner_id: req.body.owner_id,
      owner_name: req.body.owner_name,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateOwner/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("owner").updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          owner_name: req.body.owner_name,
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
  "/deleteOwner/:id",
  authToken,
  isAdmin,
  async (req, res, next) => {
    try {
      let data = await db
        .collection("owner")
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
