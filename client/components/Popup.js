import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAuth } from "../firebase/auth";
import { addExpense } from "../firebase/firestore";

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const { authUser } = useAuth();

  const handleSubmit = async () => {
    const expenseData = {
      name: expenseName,
      amount: expenseAmount,
      date: expenseDate,
    };

    try {
      await addExpense(
        authUser.uid,
        expenseData.name,
        expenseData.amount,
        expenseData.date
      );
      console.log("Expense added");
      setExpenseName("");
      setExpenseAmount("");
      setExpenseDate(new Date());
      setOpenPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={openPopup} fullWidth maxWidth="sm">
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            label="Expense Name"
            variant="outlined"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
          <TextField
            label="Expense Amount"
            variant="outlined"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Expense Date"
              value={expenseDate}
              onChange={(e) => {
                setExpenseDate(e);
              }}
            />
          </LocalizationProvider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              Close Dialog
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
