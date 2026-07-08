const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // Prevents multiple accounts with the same email
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
    },
    {
        timestamps: true, // Automatically creates and updates 'createdAt' and 'updatedAt' fields
    }
);

module.exports = mongoose.model('User', userSchema);