const express = require('express');
const controller = require('../controller');

const router = express.Router();
const { getPurchases } = controller;

router.get('/', getPurchases);

module.exports = router;
