const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

require('dotenv').config()

const tokenSecret = process.env.TOKEN_SECRET

module.exports = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers["x-access-token"]

    try {
        const decode = jwt.verify(token, tokenSecret)

        req.userId = decode.userId
        next()
    }
    catch(err) {
        console.log("error: ", err)
        res.status(500).json({message: "token is expired or corrupted"})
    }
}