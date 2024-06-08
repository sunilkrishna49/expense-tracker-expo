import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutputs/ExpensesOutput";
import { ExpensesContext } from "../store/contextApi";
import { getDateMinusDays } from "../utils/date";

const RecentExpenseScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No Expenses registered for last 7 Days."
    />
  );
};

export default RecentExpenseScreen;

const styles = StyleSheet.create({});
