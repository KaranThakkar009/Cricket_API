const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const isAdmin = require("../../middlewares/isAdmin");
const { authToken } = require("../../middlewares/auth");

// get teams request
router.get("/", async (req, res) => {
  try {
    const result = await db.collection("team").find({}).toArray();
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

router.post("/addTeams", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("team").insertOne({
      team_name: req.body.team_name,
      team_id: req.body.team_id,
    });
    res.status(200).json({
      data: data,
      message: `Data created successfully`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateTeam/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db.collection("team").updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          team_name: req.body.team_name,
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

router.delete("/deleteTeam/:id", authToken, isAdmin, async (req, res, next) => {
  try {
    let data = await db
      .collection("team")
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
