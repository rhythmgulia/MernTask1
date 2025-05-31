const express = require("express")

const router = express.Router()

const {signInUser, signUpUser} = require("../controllers/user.controller")

router.post("/signin", signInUser);

router.post("/signup", signUpUser);

module.exports = router;

