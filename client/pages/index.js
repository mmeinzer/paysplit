import React from 'react';
// import Header from '../components/Header';
import AddExpense from '../components/AddExpense';

const Index = props => (
  <>
    <AddExpense users={props.users} />
  </>
);

Index.getInitialProps = async function() {
  const users = await fetch('http://localhost:4000/users').then(res =>
    res.json()
  );
  return { users };
};

export default Index;
