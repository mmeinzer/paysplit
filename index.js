const data = require('./dev/data.js');

const ids = data.reduce((set, event) => {
  set.add(event.purchaser);
  event.recips.forEach(id => set.add(id));
  return set;
}, new Set());
const ledger = {};
ids.forEach(val => {
  ledger[val] = {
    payed: 0,
    expenses: 0,
    bought: [],
    got: []
  };
});

data.forEach(payment => {
  const { purchaser, description, amount, recips } = payment;
  const user = ledger[purchaser];

  user.bought.push(description);
  user.payed += amount;
  recips.forEach(id => {
    const recip = ledger[id];
    recip.expenses += amount / recips.length;
    recip.got.push(description);
  });
});

console.log(ledger);

const owes = Object.keys(ledger).filter(id => {
  const { payed, expenses } = ledger[id];
  return expenses > payed;
});

owes.forEach(id => {
  const { payed, expenses } = ledger[id];
  console.log(`User: ${id}`);
  console.log(`Owes: $${expenses - payed}`);
});
