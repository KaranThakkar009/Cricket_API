const express = require("express");
const router = express.Router();
const { generateToken, authToken } = require("../../middlewares/auth");

// sign in
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const result = await db.collection("users").findOne({ email: email });
    if (result) {
      if (result.password == password) {
        const user = {
          _id: result._id,
          fname: result.fname,
          lname: result.lname,
          email: result.email,
          is_admin: result.is_admin,
        };
        const accessToken = generateToken(user);
        res.status(200).json({
          status: 200,
          message: "Login Successful",
          accessToken: accessToken,
        });
      } else {
        res.status(404).send("Invaild Credentials");
      }
    } else {
      res.status(400).send("Invaild Credentials");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//  sign up
router.post("/signup", async (req, res) => {
  try {
    const result = await db.collection("users").insertOne({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      is_admin: req.body.is_admin,
    });
    console.log(result);
    res.status(200).json({
      status: 200,
      message: "user created successfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
