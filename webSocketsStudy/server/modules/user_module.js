const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { Schema } = mongoose;


const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function() {
    try {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
    } catch (error) {
        console.log(error);
    }
})

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password)
        
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User