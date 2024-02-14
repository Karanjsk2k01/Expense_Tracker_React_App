import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expense: [],
  totalexpense: 0,
  premiumActivation: false,
}


const expenseSlice = createSlice({
  name: 'expenseauth',
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {

      action.payload.forEach(entry => {
        state.expense.push(entry);
        state.totalexpense += parseInt(entry.amount)
      });

    },
    deleteExpense(state, action) {
      const id = action.payload;
      const deletedExpense = state.expense.find(item => item.id === id);
      state.expense = state.expense.filter(item => item.id !== id);
    },
    addPremium(state, action) {
      state.premiumActivation = action.payload;
    }

  }
})



export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;