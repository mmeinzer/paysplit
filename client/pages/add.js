import React from 'react';
// import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import fetch from 'isomorphic-unfetch';

const Add = props => (
  <>
    <AddExpense users={props.users} />
  </>
);

Add.getInitialProps = async function() {
  const users = await fetch('http://localhost:4000/users').then(res =>
    res.json()
  );
  return { users };
};

export default Add;
