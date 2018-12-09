const db = require('../db');

const controller = {
  async getAllPurchases(req, res) {
    const data = await db
      .from('purchase')
      .innerJoin('recipient', 'purchase._id', 'recipient.purchase_id');
    res.json(data);
  },
  async createPurchase(req, res) {
    console.log(req.body);
    const { purchaser, amount, description, recipientIds } = req.body;
    const purchaseId = await db
      .insert({ purchaser, amount, description })
      .into('purchase')
      .then(ids => ids[0]);
    recipientIds.map(async id => {
      await db
        .insert({ person_id: id, purchase_id: purchaseId })
        .into('recipient')
        .then(recipId => console.log(recipId));
    });
    res.json({ data: { purchaser, amount }, error: null });
  },
  async getAllUsers(req, res) {
    const data = await db.from('person');
    console.log(data);
    res.json(data);
  },
  async getPurchase(req, res) {
    const { id } = req.params;
    try {
      const data = await db
        .select('_id', 'purchaser')
        .from('purchase')
        .where({ _id: id });
      if (data[0]) {
        res.json({ data: data[0], error: null });
      } else {
        res.json({ data: null, error: 'That purchase does not exist' });
      }
    } catch (e) {
      res.json({ data: null, error: 'There was an unexpected server error' });
    }
  }
};

module.exports = controller;