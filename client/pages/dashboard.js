import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/navbar";
import ReceiptRow from "../components/receiptRow";
import ExpenseDialog from "../components/expenseDialog";
import { useAuth } from "../firebase/auth";
import { deleteReceipt, getReceipts } from "../firebase/firestore";
import { deleteImage } from "../firebase/storage";
import styles from "../styles/dashboard.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "../components/Popup";

export default function Dashboard() {
  const { authUser, isLoading } = useAuth();
const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();

  

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/");
    }
  }, [authUser, isLoading]);
  const onClickAdd = () => {};

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
        <IconButton
          aria-label="edit"
          color="secondary"
          className={styles.addButton}
       onClick={()=>setOpenPopup(true)} >
          <AddIcon />
        </IconButton>
        <Popup openPopup = {openPopup} setOpenPopup = {setOpenPopup} >
      </Popup>
      </Stack>
      
    </div>
  );
}
