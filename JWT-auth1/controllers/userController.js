const User = require("../models/user");
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.KEY, {expiresIn: '1d'})
}

exports.register = async (req,res) => {
    try {
        const {name, email, password} = req.body
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({error: 'User Already Registered!'})
        const user = await User.create({name, email, password})
        const token =  generateToken(user._id)
        res.status(201).json({user: {userId: user._id, name: user.name, email:user.email}, token})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}
exports.login = async(req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({error: 'Email not found, register now!'})
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(400).json({error: "Invalid email OR password!"})
        const token = generateToken(user._id)
        res.json({user:{id: user._id, name:user.name, email:user.email}, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}