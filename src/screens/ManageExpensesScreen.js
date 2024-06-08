import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/contextApi";

const ManageExpensesScreen = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEdited = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdited]);

  const expenseDeleteHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEdited) {
      expenseCtx.updateExpense(editedExpenseId, {
        description: "Aldi Supplies",
        amount: 35.5,
        date: new Date("2024-5-17"),
      });
    } else {
      expenseCtx.addExpense({
        description: "GP Medicals",
        amount: 35.5,
        date: new Date("2024-5-17"),
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEdited ? "Update" : "Add"}
        </Button>
      </View>
      {isEdited && (
        <View style={styles.deleteContainer}>
          <Ionicons
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={expenseDeleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    borderTopWidth: 2,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
