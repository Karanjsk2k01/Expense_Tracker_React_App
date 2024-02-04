import React from 'react'
import classes from './AddExpense.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faIcons, faTag } from '@fortawesome/free-solid-svg-icons'

const AddExpense = () => {
  return (
    <div className={classes.Expense}>
      <h1 style={{ textAlign: 'center' }}>Add Expenses</h1>
      <div className={classes.wrapper}>
        <form>
          <div className={classes.control}>
            <label htmlFor='Expense'>
              <FontAwesomeIcon icon={faArrowRight} />
              <span style={{ padding: '0 20px' }}>Expense</span>
            </label>
            <input type='text' id='Expense' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='ExpenseAmount'>
              <FontAwesomeIcon icon={faTag} />
              <span style={{ padding: '0 20px' }}>Amount </span>
            </label>
            <input type='number' min={0} max={100} id='ExpenseAmount' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='Category'>
              <FontAwesomeIcon icon={faIcons} />
              <span style={{ padding: '0 20px' }}>Category </span>
            </label>
            <select name="expenseitem" id="expenseitem">
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
    </div>
  )
}

export default AddExpense