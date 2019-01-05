const db = require('../db');

const controller = {
  async getAllPurchases(_, res) {
    const dbData = await db
      .from('purchase')
      .innerJoin('recipient', 'purchase._id', 'recipient.purchase_id');
    const responseData = dbData.reduce(
      (acc, item) => {
        const { purchases, ids } = acc;
        const {
          _id,
          amount,
          description,
          purchase_id,
          purchaser,
          person_id
        } = item;
        if (!ids.has(purchase_id)) {
          item.recipientIds = [];
          item.recipientIds.push(person_id);
          delete item.person_id;
          purchases.push({
            purchaseId: purchase_id,
            description,
            amount,
            purchaser,
            recipientIds: item.recipientIds
          });
          ids.add(purchase_id);
        } else {
          purchases[purchases.length - 1].recipientIds.push(item.person_id);
        }
        return acc;
      },
      { purchases: [], ids: new Set() }
    ).purchases;
    res.json(responseData);
  },
  async createPurchase(req, res) {
    const { purchaser, amount, description, recipients } = req.body;
    const purchaserId = await db('person')
      .where('handle', purchaser)
      .select('_id');
    const purchaseId = await db
      .insert({ purchaser: parseInt(purchaserId, 10), amount, description })
      .into('purchase')
      .then(ids => ids[0]);
    recipients.map(async id => {
      await db
        .insert({ person_id: id, purchase_id: purchaseId })
        .into('recipient')
        .then(recipId => console.log(recipId));
    });
    res.json({ data: { purchaser, amount }, error: null });
  },
  async getAllUsers(req, res) {
    const data = await db.from('person');
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
