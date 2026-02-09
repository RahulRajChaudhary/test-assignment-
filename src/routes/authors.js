const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllAuthors,
  getAuthorById,
  getAuthorSalesHistory
} = require('../controllers/authorsController');

const {
  getAuthorWithdrawals
} = require('../controllers/withdrawalsController')

// Define routes
router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.get('/:id/sales', getAuthorSalesHistory)
router.get('/:id/withdrawals', getAuthorWithdrawals)

module.exports = router;