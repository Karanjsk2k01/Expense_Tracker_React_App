import React, { useState } from 'react'
import classes from './AddExpense.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faIcons, faTag } from '@fortawesome/free-solid-svg-icons'

const AddExpense = () => {

  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!expenseName || !expenseAmount || !category) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: expenseAmount,
      category: category,
    };

    console.log(newExpense)

    setExpenses([...expenses, newExpense]);

    setExpenseName('');
    setExpenseAmount('');
    setCategory('');
  };

  return (
    <div className={classes.Expense}>
      <h1 style={{ textAlign: 'center' }}>Add Expenses</h1>
      <div className={classes.wrapper}>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.control}>
            <label htmlFor='Expense'>
              <FontAwesomeIcon icon={faArrowRight} />
              <span style={{ padding: '0 20px' }}>Expense</span>
            </label>
            <input type='text' id='Expense' required value={expenseName} onChange={handleExpenseNameChange} />
          </div>
          <div className={classes.control}>
            <label htmlFor='ExpenseAmount'>
              <FontAwesomeIcon icon={faTag} />
              <span style={{ padding: '0 20px' }}>Amount </span>
            </label>
            <input type='number' min={0} max={1000} id='ExpenseAmount' required value={expenseAmount} onChange={handleExpenseAmountChange} />
          </div>
          <div className={classes.control}>
            <label htmlFor='Category'>
              <FontAwesomeIcon icon={faIcons} />
              <span style={{ padding: '0 20px' }}>Category </span>
            </label>
            <select name="expenseitem" id="expenseitem" value={category} onChange={handleCategoryChange}>
              <option value="" selected> Select </option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="others">others</option>
            </select>
            <button>Add Expense</button>
          </div>
        </form>
      </div>
      <div className={classes.wrapper}>
        {expenses.length === 0 && <span>No Expense Found! Add more...</span>}
        {expenses.length > 0 && expenses?.map((item, index) => (
          < ul key={index} className={classes.expenseList}>
            <li className={classes.expense}>
              {item.name}
            </li>
            <li className={classes.type}>
              Type:{item.category}
            </li>
            <li className={classes.amount}>
              ${item.amount}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default AddExpense