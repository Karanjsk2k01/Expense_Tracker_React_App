import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseContext'
import themeReducer from './themeContext';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    theme: themeReducer,
  },
});

export default store;