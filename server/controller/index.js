const db = require('../db');

const controller = {
  async getPurchases(req, res) {
    const data = await db
      .from('purchase')
      .innerJoin('recipient', 'purchase._id', 'recipient.purchase_id');
    res.json(data);
  }
};

module.exports = controller;
