import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import configureStore from 'redux-mock-store';
import AddExpense from './AddExpense';

const mockStore = configureStore([]);

describe('<AddExpense />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      theme: {
        darkMode: false,
      },
      expenses: {
        expense: [],
        totalexpense: 0,
        premiumActivation: false,
      },
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );
  });

  it('displays Add Expenses header', () => { // Move this test outside of the previous test
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );
    expect(getByText('Add Expenses')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
