import React, { useEffect, useState } from 'react'
import classes from './AddExpense.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faIcons, faTag } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const AddExpense = () => {

  useEffect(() => {

    const fetchData = async () => {
      const idToken = localStorage.getItem('token');

      if (!idToken) {
        navigate('/Auth');
        return;
      }

      const url = 'https://react-api-demo-f9b0e-default-rtdb.firebaseio.com//expenses.json';

      try {
        // Post expense details to Firebase
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Something went Wrong..');
          return;
        }

        // Retrieve updated expenses from Firebase
        const fetchExpensesResponse = await fetch(url);
        const data = await fetchExpensesResponse.json();

        const updatedExpenses = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        setExpenses(updatedExpenses);

      } catch (error) {
        console.error('Error adding expense:', error.message);
      }
    }

    fetchData()
  }, [])

  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const filteredItems = expenses.filter((item) => id !== item.id)

    const url = `https://react-api-demo-f9b0e-default-rtdb.firebaseio.com/expenses/${id}.json/`;


    try {
      let res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete the item');
        return;
      }

      let fetchedData = await res.json()

      console.log(fetchedData)

    } catch (error) {
      console.log('Error:', error.message);
    }


    setExpenses(filteredItems)
  }

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleEdit = (id) => {

    setEditExpenseId(id);

    const expenseToEdit = expenses.find((item) => item.id === id);

    setExpenseName(expenseToEdit.name);
    setExpenseAmount(expenseToEdit.amount);
    setCategory(expenseToEdit.category)
  };

  const handleCancelEdit = () => {
    setEditExpenseId(null);
    setExpenseName('');
    setExpenseAmount('');
    setCategory('');
  };


  const handleUpdateExpense = async (e) => {

    e.preventDefault()
    const idToken = localStorage.getItem('token');

    if (!idToken) {
      navigate('/Auth');
      return;
    }

    const url = `https://react-api-demo-f9b0e-default-rtdb.firebaseio.com/expenses/${editExpenseId}.json`;

    // Check if all fields are filled
    if (!expenseName || !expenseAmount || !category) {
      alert('Please fill in all fields');
      return;
    }

    const updatedExpense = {
      name: expenseName,
      amount: expenseAmount,
      category: category,
    };

    console.log(updatedExpense)

    try {
      // Update expense details in Firebase using PUT method
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      // Retrieve updated expenses from Firebase
      const fetchExpensesResponse = await fetch('https://react-api-demo-f9b0e-default-rtdb.firebaseio.com/expenses.json');
      const data = await fetchExpensesResponse.json();

      const updatedExpenses = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setExpenses(updatedExpenses);
      setExpenseName('');
      setExpenseAmount('');
      setCategory('');
      setEditExpenseId(null);
    } catch (error) {
      console.error('Error updating expense:', error.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const idToken = localStorage.getItem('token');

    if (!idToken) {
      navigate('/Auth');
      return;
    }

    const url = 'https://react-api-demo-f9b0e-default-rtdb.firebaseio.com//expenses.json';

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

    try {
      // Post expense details to Firebase
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
        return;
      }

      // Retrieve updated expenses from Firebase
      const fetchExpensesResponse = await fetch(url);
      const data = await fetchExpensesResponse.json();

      const updatedExpenses = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));

      setExpenses(updatedExpenses);

      setExpenseName('');
      setExpenseAmount('');
      setCategory('');

    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  };


  return (
    <div className={classes.Expense}>
      <div className={classes.wrapper}>
        <h1 style={{ textAlign: 'center' }}>Add Expenses</h1>
        <form onSubmit={editExpenseId !== null ? handleUpdateExpense : handleFormSubmit}>
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
              <option defaultValue="Select"> Select </option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="others">others</option>
            </select>
            <div className={classes.buttonWrapper}>
              <button>{editExpenseId !== null ? 'Update Expense' : 'Add Expense'}</button>
              {editExpenseId !== null && (
                <button type="button" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>

          </div>
        </form>
      </div>
      <div className={classes.wrapper} >
        <div className={classes.wrappersub}>
          {expenses.length === 0 && <span>No Expense Found! Add more...</span>}
          {expenses.length > 0 && expenses?.map((item, index) => (
            < ul key={item.id} className={classes.expenseList}>
              <li className={classes.expense}>
                {item.name}
              </li>
              <li className={classes.type}>
                Type:{item.category}
              </li>
              <li className={classes.amount}>
                ${item.amount}
              </li>
              <button onClick={(e) => { return handleDelete(item.id) }}>Delete</button>
              <button onClick={(e) => { return handleEdit(item.id) }}>Edit</button>
            </ul>
          ))}
        </div>


      </div>
    </div >
  )
}

export default AddExpense