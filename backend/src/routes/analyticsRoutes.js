const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Analytics routes
router.get('/category-summary', analyticsController.getCategorySummary);
router.get('/monthly-totals', analyticsController.getMonthlyTotals);
router.get('/statistics', analyticsController.getStatistics);

module.exports = router;