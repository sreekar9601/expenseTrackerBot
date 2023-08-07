import React from "react";
import { TableRow, TableCell, IconButton, TableContainer, Table } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';

export const ExpenseRow = ({ id, name, amount, date, onDelete }) => {
    return (
     
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableRow >
        <TableCell>{name}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{date.toDate().toLocaleDateString()}</TableCell>
        <TableCell>
          <IconButton onClick={() => onDelete(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      </Table>
    </TableContainer>
    );
  };