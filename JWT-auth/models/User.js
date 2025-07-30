const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    createdAt: {type:Date, default: Date.now}
})

userSchema.pre('save', async(next)=>{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User