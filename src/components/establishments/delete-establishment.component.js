import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";

export function DeleteEstablishmentDialog(props) {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deletedResponse = await props.handleDelete({
        establishmentId: props.establishmentToDelete._id,
      });
      if (deletedResponse.error) {
        enqueueSnackbar(deletedResponse.error.data.message, {
          variant: "error",
        });
      } else {
        props.handleClose();
        window.location.reload(false);
      }
    } catch (error) {
      enqueueSnackbar(`An error ocurred ${error}`, { variant: "error" });
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this establishment? <br />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          color="secondary"
          startIcon={<CloseIcon />}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
