const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Links this category to a specific user
        },
        name: {
            type: String,
            required: [true, 'Please add a category name'],
            trim: true,
        },
        type: {
            type: String,
            enum: ['income', 'expense'], // Restricts values to only these two options
            required: [true, 'Please specify if it is an income or expense'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Category', categorySchema);