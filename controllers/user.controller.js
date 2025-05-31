const mongoose = require("mongoose")
const bcrypt= require("bcryptjs")
const {validationResult} = require("express-validator")
const users = require("../models/user")
const ObjectId = mongoose.Types.ObjectId
const jwt = require("jsonwebtoken")

require('dotenv').config()


let signInUser = async(req, res) => {
    let body = req.body;
    let errors = validationResult(req)
    if (!errors.isEmpty()){
        res.staus(400).json({success: false, message: errors[0].message})
    }
    query = {
        email: body.email
    }
    console.log(query)
    let user = await users.findOne(query)

    let isPassMatched = await bcrypt.compare(body.password, user.password)
    if (!isPassMatched){
        return res.status(404).json({success: false, message: "password incorrect"})
    }

    const payload = {
        user: user._id,
        type: user.type || 0,
        name: user.name
    }

    const tokenSecret = process.env.TOKEN_SECRET

    jwt.sign(payload, tokenSecret, {
        expiresIn: 3600
    }, (err, token) => {
        if (err){
            res.status(500).json({message: err.message})
        }
        res.status(200).json({success: true, token: token})
    })
}

let signUpUser = async(req, res) => {
    let userId = req.params.id;
    let body = req.body;
    let errors = validationResult(req)
    if (!errors.isEmpty()){
        res.status(400).json({success: false, message: errors.array()[0].message})
    }

    let existingUser = await users.findOne({email: body.email})
    if (existingUser){
        return res.status(404).json({success: false, message: "user already exists"})
    }

    const gen = await bcrypt.genSalt(11);

    let newUser = {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, gen),
        phone: body.phone
    }
    await users.insertOne(newUser)
    res.status(200).json({success: true, message: "user signed up successfully"})
}



module.exports = {
    signInUser,
    signUpUser
}