import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { getDateFormatted } from "../../utils/date";

const initialState = [
  {
    id: "e1",
    description: "A pair of Shoes",
    amount: 59.99,
    date: "2024-06-07",
  },
  {
    id: "e2",
    description: "A pair of Clothes",
    amount: 39.99,
    date: "2024-06-5",
  },
  {
    id: "e3",
    description: "Phone Bills",
    amount: 20.99,
    date: "2024-06-4",
  },
  {
    id: "e4",
    description: "Restaurant Bills",
    amount: 89.99,
    date: "2024-04-16",
  },
  {
    id: "e5",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-03-30",
  },
  {
    id: "e6",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-02-30",
  },
  {
    id: "e7",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-01-30",
  },
  {
    id: "e8",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-01-30",
  },
  {
    id: "e9",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-02-30",
  },
  {
    id: "e10",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-03-30",
  },
  {
    id: "e11",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-04-30",
  },
  {
    id: "e12",
    description: "Lidl Bills",
    amount: 109.99,
    date: "2024-05-30",
  },
];

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        ...action.payload,
        id: uuidv4(),
        date: getDateFormatted(action.payload.date),
      };
      state.push(newExpense);
    },
    deleteExpense: (state, action) => {
      return state.filter((expense) => expense.id !== action.payload);
    },
    updateExpense: (state, action) => {
      const { id, data } = action.payload;
      const existingExpense = state.findIndex((expense) => expense.id === id);
      if (existingExpense) {
        existingExpense.description = data.description;
        existingExpense.amount = data.amount;
        // existingExpense.date = data.date;
        existingExpense.date = getDateFormatted(data.date);
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
