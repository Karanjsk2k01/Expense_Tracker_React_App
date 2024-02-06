import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseContext'

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;