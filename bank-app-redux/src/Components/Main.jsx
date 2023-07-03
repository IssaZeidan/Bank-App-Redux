import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAccount,
  editAccount,
  deleteAccount,
  addAccountAsync,
  deleteAccountAsync,
} from '../Store';
import './Main.css';

const Main = () => {
  const accounts = useSelector((state) => state.accounts);
  const numberOfAccounts = useSelector((state) => state.numberOfAccounts);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setCustomerName('');
    setAccountNumber('');
    setAccountType('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(
        editAccount({
          id: editingId,
          customerName,
          accountNumber,
          accountType,
        })
      );
    } else {
      const newAccount = {
        id: accounts.length + 1,
        customerName,
        accountNumber,
        accountType,
      };

      dispatch(addAccountAsync(newAccount));
    }

    toggleForm();
  };

  const handleEdit = (account) => {
    setEditingId(account.id);
    setCustomerName(account.customerName);
    setAccountNumber(account.accountNumber);
    setAccountType(account.accountType);
    setShowForm(true);
  };

  const handleDelete = (accountId) => {
    dispatch(deleteAccountAsync(accountId));
  };

  return (
    <main className="main-container">
      <div className="button-container">
        <button className="add-user-button" onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Add User'}
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
            {editingId ? 'Save' : 'Add'}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>
                {editingId === account.id ? (
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                ) : (
                  account.customerName
                )}
              </td>
              <td>
                {editingId === account.id ? (
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                ) : (
                  account.accountNumber
                )}
              </td>
              <td>
                {editingId === account.id ? (
                  <input
                    type="text"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                ) : (
                  account.accountType
                )}
              </td>
              <td>
                {editingId === account.id ? (
                  <button className="action-button" onClick={handleSubmit}>
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="action-button"
                      onClick={() => handleEdit(account)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDelete(account.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Number of Accounts: {numberOfAccounts}</p>
    </main>
  );
};

export default Main;
