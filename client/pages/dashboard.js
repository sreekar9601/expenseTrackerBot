import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/navbar";
import { useAuth } from "../firebase/auth";
import styles from "../styles/dashboard.module.scss";
import Popup from "../components/Popup";
import { getExpense } from "../firebase/firestore";
import { ExpenseRow } from "../components/expenseRow";
import { deleteExpense } from "../firebase/firestore";

export default function Dashboard() {
  const { authUser, isLoading } = useAuth();
  const [openPopup, setOpenPopup] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);
  const onClickAdd = () => {};

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userExpenses = await getExpense(authUser.uid);
        setExpenses(userExpenses);
      } catch (err) {
        console.log(err);
      }
    };
    if (authUser) {
      fetchExpenses();
    }
  }, [authUser]);

  const onDelete = async (expenseId) => {
    try{
      await deleteExpense(authUser.uid, expenseId);
      const newExpenses = expenses.filter((expense)=>expense.id!==expenseId);
      setExpenses(newExpenses);
    }
    catch(err){
      console.log("Could not delete expense", err);
    }
  }

  return !authUser ? (
    <CircularProgress
      color="inherit"
      sx={{ marginLeft: "50%", marginTop: "25%" }}
    />
  ) : (
    <div>
      <Head>
        <title>Expense Tracker</title>
      </Head>

      <NavBar />
      <Stack direction="row" sx={{ paddingTop: "1.5em" }}>
        <Typography variant="h4" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
          EXPENSES
        </Typography>
        <div>
          {expenses.map((expense) => (
            <ExpenseRow
              id={expense.id}
              name={expense.name}
              amount={expense.amount}
              date={expense.date}
              onDelete = {onDelete}
            />
          ))}
        </div>
        <IconButton
          aria-label="edit"
          color="secondary"
          className={styles.addButton}
          onClick={() => setOpenPopup(true)}
        >
          <AddIcon />
        </IconButton>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}></Popup>
      </Stack>
    </div>
  );
}
