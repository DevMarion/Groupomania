const mongoose = require('mongoose');
const uniqueEmail = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    profil: { type: String },
    isAdmin: { type: Boolean, default: false }
},
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueEmail);

module.exports = mongoose.model('user', userSchema);