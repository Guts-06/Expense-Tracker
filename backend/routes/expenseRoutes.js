const express = require('express');
const router = express.Router();
const { getExpenses, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// Base routes (/api/expenses)
router.route('/')
  .get(protect, getExpenses)
  .post(protect, createExpense);

// Routes requiring an ID (/api/expenses/:id)
router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;