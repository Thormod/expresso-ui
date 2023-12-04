import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import SyncIcon from "@mui/icons-material/Sync";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { parseAddressComponents } from "../../utils/parse-address";
import { LoadScript } from "@react-google-maps/api";
import { CONSTANTS } from "../../app/constants";
import AddressAutocomplete from "../shared/address-autocomplete";
import { DialogTransition } from "../shared/dialog-transition";

export default function UpdateEstablishmentDialog(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({});

  const handleSubmit = async (event) => {
    try {
      const updateResult = await props.handleSubmit({
        id: inputs.id,
        name: inputs.name,
        ownerName: inputs.ownerName,
        managerName: inputs.managerName,
      });

      if (updateResult.error) {
        enqueueSnackbar(updateResult.error.data.message, { variant: "error" });
      } else {
        props.handleClose();
        window.location.reload(false);
      }
    } catch (error) {
      enqueueSnackbar(`An error ocurred ${error}`, { variant: "error" });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  if (
    Object.keys(props.establishmentData).length > 0 &&
    Object.keys(inputs).length === 0
  ) {
    setInputs({
      id: props.establishmentData._id,
      name: props.establishmentData.name,
      address: props.establishmentData.address,
      zipCode: props.establishmentData.zipCode,
      owner: props.establishmentData.owner,
      manager: props.establishmentData.manager,
    });
  }

  const handleClose = (event) => {
    event.preventDefault();
    setInputs({});
    props.handleClose();
  };

  const handleSelectAddress = (selectedAddress) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      address: selectedAddress,
    }));
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Update Establishment</DialogTitle>
      <DialogContent>
        <DialogContentText>Update Establisment</DialogContentText>
        <form onSubmit={handleSubmit}>
          <br />
          <TextField
            type="input"
            required
            autoFocus
            name="name"
            label="Name"
            value={inputs.name}
            onChange={handleChange}
            fullWidth
          />

          <br />
          <br />
          <TextField
            type="input"
            required
            name="ownerName"
            label="Owner Name"
            value={inputs.owner}
            onChange={handleChange}
            fullWidth
          />

          <br />
          <br />
          <TextField
            type="input"
            required
            name="managerName"
            label="Manager Name"
            value={inputs.manager}
            onChange={handleChange}
            fullWidth
          />

          <br />
          <br />
          <TextField
            type="input"
            disabled={true}
            name="address"
            label="Address"
            value={inputs.address}
            fullWidth
          />

          <DialogActions>
            <Button
              startIcon={<ClearIcon />}
              variant="contained"
              sx={{ mr: 1 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              startIcon={<SyncIcon />}
              variant="contained"
              sx={{ mr: 1 }}
              type="submit"
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
