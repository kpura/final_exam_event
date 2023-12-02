import React, { useState } from 'react';
import Sales_Chart from './Sales_Chart';
import Stock_Level_Chart from './Stock_Level_Chart';

const TransactionReport = ({ transactions, products }) => {
  const [sortByCount, setSortByCount] = useState(false);

  const sortedTransactions = sortByCount
    ? transactions.slice().sort((a, b) => b.quantity - a.quantity)
    : transactions;

  const toggleSortByCount = () => {
    setSortByCount(!sortByCount);
  };

  return (
    <div>
      <button onClick={toggleSortByCount}>
        {sortByCount ? 'Sort by Date' : 'Sort by Transaction Count'}
      </button>
      {sortedTransactions.length > 0 ? (
        <div>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>₱{transaction.price.toLocaleString()}</td>
                  <td>{transaction.quantity}</td>
                  <td>₱{(transaction.quantity * transaction.price).toLocaleString()}</td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions to display.</p>
      )}
      <br /><br />
      <Sales_Chart transactions={sortedTransactions} />
      <br />
      <Stock_Level_Chart products={products} />
    </div>
  );
};

export default TransactionReport;