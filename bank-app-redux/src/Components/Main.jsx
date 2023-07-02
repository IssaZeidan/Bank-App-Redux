import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '../Store';
import './Main.css';

const Main = () => {
  const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const [accounts, setAccounts] = useState(storedAccounts);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = accounts.length + 1;

    const newAccount = {
      id,
      customerName,
      accountNumber,
      accountType,
    };

    dispatch(addAccount(newAccount));

    setAccounts([...accounts, newAccount]);
    setCustomerName('');
    setAccountNumber('');
    setAccountType('');
  };

  return (
    <main className="main-container">
      <div className="button-container">
        <button className="add-user-button" onClick={toggleForm}>
          Add User
        </button>
      </div>
      {showForm && (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountType">Account Type:</label>
            <input
              type="text"
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Add
          </button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Account Number</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.customerName}</td>
              <td>{account.accountNumber}</td>
              <td>{account.accountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Main;
