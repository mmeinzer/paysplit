import React from 'react';
import fetch from 'isomorphic-unfetch';

const classes = {
  h1: 'mb-3',
  container:
    'container mx-auto max-w-md shadow px-4 py-5 text-grey-darkest bg-blue-lighter',
  form: 'flex flex-col w-4/5 mx-auto border p-3 rounded bg-blue-lightest',
  input: 'border h-8 rounded mb-2 pl-1 bg-grey-lightest w-full',
  label: 'block text-lg pt-3 pb-1',
  ul: 'list-reset absolute bg-grey-lightest w-full rounded shadow -mt-2 z-40',
  li: 'pl-1 py-1 hover:bg-blue hover:text-white focus:bg-blue focus:text-white',
  submit:
    'mt-3 font-bold text-grey-lightest bg-blue py-2 rounded border-2 border-blue hover:bg-grey-lightest hover:text-blue'
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectPurchaser = this.handleSelectPurchaser.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  state = {
    focus: 'purchaser',
    amount: null,
    purchaser: '',
    description: '',
    recipients: ''
  };
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { amount, purchaser, description, recipients } = this.state;
    const recipientList = recipients
      .split(',')
      .filter(str => str !== '')
      .map(name => name.trim().toLowerCase());
    const postData = {
      amount,
      purchaser: purchaser.toLowerCase(),
      description,
      recipients: recipientList
    };
    console.log(postData);
  }
  handleChange(e) {
    if (e.target.type === 'number') {
      const number = parseFloat(e.target.value);
      this.setState({ [e.target.id]: number });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }
  onFocus(e) {
    this.setState({ focus: e.target.id });
  }
  handleSelectPurchaser(e) {
    this.setState({ purchaser: e.target.innerText, focus: null });
  }
  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.setState({ purchaser: e.target.innerText, focus: null });
    }
  }
  render() {
    const { users } = this.props;
    return (
      <div className={classes.container}>
        <h2 className={classes.h1}>Add an expense...</h2>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className="relative">
            <label
              htmlFor="purchaser"
              className={classes.label}
              placeholder="Purchaser"
            >
              Who paid?
            </label>
            <input
              id="purchaser"
              type="text"
              className={`${classes.input}`}
              placeholder="Purchaser"
              value={this.state.purchaser}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              autoComplete="off"
              autoFocus
            />
            <ul
              className={
                this.state.focus === 'purchaser' && this.state.purchaser !== ''
                  ? classes.ul
                  : `${classes.ul} hidden`
              }
            >
              {users
                ? users
                    .filter(user => {
                      const regex = new RegExp(this.state.purchaser, 'gi');
                      return user.handle.match(regex);
                    })
                    .map(user => {
                      return (
                        <li
                          key={user._id}
                          className={classes.li}
                          onClick={this.handleSelectPurchaser}
                          tabIndex="0"
                          onKeyUp={this.handleKeyUp}
                        >
                          {user.handle}
                        </li>
                      );
                    })
                : null}
            </ul>
          </div>
          <label htmlFor="description" className={classes.label}>
            What was it?
          </label>
          <input
            id="description"
            type="text"
            className={classes.input}
            placeholder="Description"
            onFocus={this.onFocus}
            onChange={this.handleChange}
          />
          <label htmlFor="amount" className={classes.label}>
            How much was it?
          </label>
          <input
            id="amount"
            type="number"
            step=".01"
            className={classes.input}
            placeholder="Cost"
            onFocus={this.onFocus}
            onChange={this.handleChange}
          />
          <label htmlFor="recipients" className={classes.label}>
            Who's it for?
          </label>
          <input
            id="recipients"
            type="text"
            className={classes.input}
            placeholder="Recipient(s)"
            onFocus={this.onFocus}
            onChange={this.handleChange}
          />
          <button className={classes.submit} type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}
