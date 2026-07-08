const Category = require('../models/Category');

// @desc    Get user categories
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
    try {
        // Find all categories that belong to the logged-in user
        const categories = await Category.find({ user: req.user.id });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            return res.status(400).json({ message: 'Please provide both name and type' });
        }

        // Create the category and link it to the user who made the request
        const category = await Category.create({
            name,
            type,
            user: req.user.id,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory };