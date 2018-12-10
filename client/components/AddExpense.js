import React from 'react';
import fetch from 'isomorphic-unfetch';

const classes = {
  container:
    'container mx-auto max-w-md shadow px-4 py-5 text-grey-darkest bg-blue-lighter',
  form: 'flex flex-col w-2/5 mx-auto',
  input: 'border h-8 rounded mb-2 pl-1 bg-grey-lightest w-full',
  label: 'block text-lg pt-3 pb-1',
  ul: 'list-reset absolute bg-grey-lightest w-full rounded shadow -mt-2',
  li: 'pl-1 py-1 hover:bg-blue hover:text-white'
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    focus: 'purchaser'
  };
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  onFocus(e) {
    this.setState({ focus: e.target.id });
  }
  render() {
    const { users } = this.props;
    return (
      <div className={classes.container}>
        <h2>Add an expense...</h2>
        <form className={classes.form}>
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
              autoFocus
            />
            <ul
              className={
                this.state.focus === 'purchaser'
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
                        <li key={user._id} className={classes.li}>
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
          />
        </form>
      </div>
    );
  }
}
