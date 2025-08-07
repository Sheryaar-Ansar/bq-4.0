const User = require("../models/User");
const jwt = require('jsonwebtoken')

const generateToken = (userId, role) => {
    return jwt.sign({user: userId, role}, process.env.SECRET, {expiresIn: '1d'})
}

exports.register = async (req,res) => {
    try {
        const { name, email, role, password } = req.body
        const existUser = await User.findOne({email})
        if(existUser) return res.status(400).json({error: 'You are already registered on this email'})
        const user = await User.create({name, email, role, password})
        const token = generateToken(user._id, user.role)
        res.status(201).json({user: {id: user._id, name: user.name, email: user.email, role: user.role}, token})
    } catch (error) {
        res.status(400).json({error: error.message})   
    }
}

exports.login = async(req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({error: 'Invalid email or password'})
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(400).json({error: 'Invalid email or password'})
        const token = generateToken(user._id, user.role)
        res.json({user: {id: user._id, name: user.name, email: user.email, role: user.role}, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getAllUsers = async(req,res) => {
    const users = await User.find({}, '-password')
    res.json(users)
}
exports.getUserById = async(req,res) => {
    // const { id } = req.params
    
    const user = await User.findById(req.params.id, '-password')
    // console.log('req user id: ', req.user.user, 'user Id: ', user._id.toString());
    if(!user) return res.status(404).json({error: 'User Not Found'})
    
    if(req.user.role !== 'admin' && req.user.user !== user._id.toString()) return res.status(403).json({error: 'You are not authorized to access this action'})
    res.json(user)
}
exports.updateRoleStatus = async(req,res) => {
    const { role } = req.body
    // const { id } = req.params
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        {role},
        {new:true},
    ).select('-password')
    if(req.user.role !== 'admin') return res.status(403).json({error:'Permission denied'})
    res.json(updated)
}

exports.deleteUserById = async(req,res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({message: 'User deleted'})
}