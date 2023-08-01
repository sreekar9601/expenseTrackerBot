import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";


export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const [value, setValue] = useState(new Date());
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
          <TextField label="Expense Name" variant="outlined" />
          <br />
          <TextField label="Expense Amount" variant="outlined" />
          <br />
          <DatePicker label="Expense Date" />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
