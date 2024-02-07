import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import configureStore from 'redux-mock-store';
import AddExpense from './AddExpense';

const mockStore = configureStore([]);

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

it('displays Add Expenses header', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddExpense />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Add Expenses')).toBeInTheDocument();
});

it('displays form fields for adding expense', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddExpense />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText('Expense')).toBeInTheDocument();
  expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  expect(screen.getByText('Add Expense')).toBeInTheDocument();
});

describe('<AddExpense />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: '1', name: 'Expense 1', amount: 100, category: 'Food' },
        { id: '2', name: 'Expense 2', amount: 200, category: 'Entertainment' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AddExpense component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Expense 1')).toBeInTheDocument();
    expect(screen.getByText('Expense 2')).toBeInTheDocument();
  });

  it('fetches data on component mount', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddExpense />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the fetch call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://react-api-demo-f9b0e-default-rtdb.firebaseio.com//expenses.json'
      );
    });

    // Wait for the element with text "Expense 1" to appear
    const expense1Element = await screen.findByText('Expense 1');
    expect(expense1Element).toBeInTheDocument();

    // Assert other expectations
    expect(screen.getByText('Expense 2')).toBeInTheDocument();
  });

});
