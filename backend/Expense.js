const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category', // Links to the Category model we just created
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            min: [0, 'Amount cannot be negative'], // Validation to prevent negative expenses
        },
        expenseDate: {
            type: Date,
            required: [true, 'Please add a date for the transaction'],
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Expense', expenseSchema);