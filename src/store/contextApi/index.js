import { createContext, useReducer } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const DummyExpenses = [
  {
    id: "e1",
    description: "A pair of Shoes",
    amount: 59.99,
    date: new Date("2024-06-07"),
  },
  {
    id: "e2",
    description: "A pair of Clothes",
    amount: 39.99,
    date: new Date("2024-06-5"),
  },
  {
    id: "e3",
    description: "Phone Bills",
    amount: 20.99,
    date: new Date("2024-06-4"),
  },
  {
    id: "e4",
    description: "Restaurant Bills",
    amount: 89.99,
    date: new Date("2024-04-16"),
  },
  {
    id: "e5",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-03-30"),
  },
  {
    id: "e6",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-02-30"),
  },
  {
    id: "e7",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-01-30"),
  },
  {
    id: "e8",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-01-30"),
  },
  {
    id: "e9",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-02-30"),
  },
  {
    id: "e10",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-03-30"),
  },
  {
    id: "e11",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-04-30"),
  },
  {
    id: "e12",
    description: "Lidl Bills",
    amount: 109.99,
    date: new Date("2024-05-30"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const ExpensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = uuidv4();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(ExpensesReducer, DummyExpenses);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
