import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AddExpense from "./AddExpense";
import store from "../store/context"; // Import your Redux store
import { Provider } from "react-redux";

describe('Add Expense component testing', () => {
  test('checks "Add expense" is present or not', () => {
    render(
      <Provider store={store}>
        <Router> {/* Wrap your component with BrowserRouter */}
          <AddExpense />
        </Router>
      </Provider>

    );

    // Assert
    const textAddExpense = screen.getByText('Add Expense', { exact: false });
    expect(textAddExpense).toBeInTheDocument();
  });
});
