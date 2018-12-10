const express = require('express');
const controller = require('../controller');

const router = express.Router();
const {
  getAllUsers,
  getAllPurchases,
  createPurchase,
  getPurchase
} = controller;

// GET
router.get('/users', getAllUsers);
router.get('/purchases', getAllPurchases);
router.get('/purchase/:id', getPurchase);

// POST
router.post('/purchase', createPurchase);

module.exports = router;
