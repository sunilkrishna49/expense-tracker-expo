import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutputs/ExpensesOutput";
import { ExpensesContext } from "../store/contextApi";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const AllExpensesScreen = () => {
  const expenseCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (expenseCtx.expenses) {
      setIsLoading(false);
    }
  });

  // if (isLoading) {
  //   return <LoadingOverlay />;
  // }

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
