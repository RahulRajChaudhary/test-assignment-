const express = require('express');
const router = express.Router();

// Import controller function
const { createWithdrawal } = require('../controllers/withdrawalsController');

// Define route
router.post('/', createWithdrawal)
module.exports = router;