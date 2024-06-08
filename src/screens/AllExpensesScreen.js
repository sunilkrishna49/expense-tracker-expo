import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutputs/ExpensesOutput";
import { ExpensesContext } from "../store/contextApi";

const AllExpensesScreen = () => {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No Expenses registered yet."
    />
  );
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
