import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { addExpense } from "../firebase/firestore";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth } from "../firebase/auth";
export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const[expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
const [expenseDate, setExpenseDate] = useState(new Date());
  const { authUser } = useAuth();
  const handleSubmit = async () =>{
    const expenseData = {
      name: expenseName,
      amount: expenseAmount,
      date: expenseDate
    }
    try{
      await addExpense(authUser.uid, expenseData.name,expenseData.amount,expenseData.date);
      await console.log("Expense added");
      setExpenseName("");
    setExpenseAmount("");
    setExpenseDate(new Date());
    setOpenPopup(false);  
    }
    catch(error){
      console.log(error);
    }

  }
  return (
    <Dialog open={openPopup} fullWidth maxWidth="sm">
      <DialogTitle>
        <div>Add Expense</div>
      </DialogTitle>
      <DialogContent>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          Close Dialog
        </Button>
        <Stack spacing={2} margin={2}>
          <TextField label="Expense Name" variant="outlined" value = {expenseName} onChange={(e)=>setExpenseName(e.target.value)}/>
          <br />
          <TextField label="Expense Amount" variant="outlined" value = {expenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} />
          <br />
          {/* <DatePicker label="Expense Date"value = {dayjs(expenseDate)} onChange={(e)=>setExpenseDate(e.target.value)} /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={expenseDate}
        onChange={(e) => {
          setExpenseDate(e);
        }}
      />
    </LocalizationProvider>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
