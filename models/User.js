const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            next()
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next()
    } catch (er) {
        next(er) // pass error to express errorHandler
    }

})

userSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}


module.exports = model('User', userSchema)