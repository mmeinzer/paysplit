const db = require('../db');
const data = require('./data.js');

const ids = data.reduce((set, event) => {
  set.add(event.purchaser);
  event.recips.forEach(id => set.add(id));
  return set;
}, new Set());

ids.forEach(async id => {
  await db('person').insert({
    handle: `user${id}`
  });
});

data.forEach(async ({ description, purchaser, amount, recips }) => {
  try {
    const res = await db('purchase').insert({
      purchaser,
      description,
      amount
    });
    recips.forEach(async id => {
      await db('recipient').insert({
        person_id: id,
        purchase_id: res[0]
      });
    });
  } catch (e) {
    console.log(e);
  }
});

// const ledger = {};
// ids.forEach(val => {
//   ledger[val] = {
//     payed: 0,
//     expenses: 0,
//     bought: [],
//     got: []
//   };
// });

// data.forEach(payment => {
//   const { purchaser, description, amount, recips } = payment;
//   const user = ledger[purchaser];

//   user.bought.push(description);
//   user.payed += amount;
//   recips.forEach(id => {
//     const recip = ledger[id];
//     recip.expenses += amount / recips.length;
//     recip.got.push(description);
//   });
// });

// console.log(ledger);

// const owes = Object.keys(ledger).filter(id => {
//   const { payed, expenses } = ledger[id];
//   return expenses > payed;
// });

// owes.forEach(id => {
//   const { payed, expenses } = ledger[id];
//   console.log(`User: ${id}`);
//   console.log(`Owes: $${expenses - payed}`);
// });
