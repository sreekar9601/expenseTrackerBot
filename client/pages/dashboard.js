// dashboard.js

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircularProgress, Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/navbar";
import { useAuth } from "../firebase/auth";
import styles from "../styles/dashboard.module.scss"; // Make sure this path is correct
import Popup from "../components/Popup";
import { getExpense } from "../firebase/firestore";
import { ExpenseRow } from "../components/expenseRow";

export default function Dashboard() {
  const { authUser, isLoading } = useAuth();
  const [openPopup, setOpenPopup] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (authUser) {
          const userExpenses = await getExpense(authUser.uid);
          setExpenses(userExpenses);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, [authUser]);

  const handleAddExpense = () => {
    setOpenPopup(true);
  };

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
      </Head>

      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant="h4">Expenses</Typography>
          <Fab
            color="secondary"
            aria-label="add"
            onClick={handleAddExpense}
            className={styles.addButton}
          >
            <AddIcon />
          </Fab>
        </div>
        {isLoading ? (
          <CircularProgress
            color="primary"
            sx={{ margin: "auto", marginTop: "2em" }}
          />
        ) : (
          <div className={styles.expenseList}>
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                name={expense.name}
                amount={expense.amount}
                date={expense.date}
              />
            ))}
          </div>
        )}
      </div>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  );
}
