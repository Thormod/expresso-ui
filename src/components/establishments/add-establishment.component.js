import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { DialogTransition } from "../shared/dialog-transition";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AddressAutocomplete from "../shared/address-autocomplete";
import { LoadScript } from "@react-google-maps/api";

import { CONSTANTS } from "../../app/constants";
import { parseAddressComponents } from "../../utils/parse-address";

export default function AddEstablishmentDialog(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({});

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmit = async (event) => {
    try {
      const { address, city, state, smallAddress } =
        parseAddressComponents(selectedAddress);

      const parsedAddress = `${smallAddress}, ${city}, ${state} ${inputs.zipCode}`;

      event.preventDefault();

      const apiResult = await props.handleSubmit({
        name: inputs.name,
        address: parsedAddress,
        addressLine2: inputs.addressLine2,
        city: city,
        ownerName: inputs.ownerName,
        managerName: inputs.managerName,
      });

      if (apiResult.error) {
        enqueueSnackbar(apiResult.error.data.message, { variant: "error" });
      } else {
        props.handleClose();
        // window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`An error ocurred ${error}`, { variant: "error" });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Add Establishment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add establishments with name, address and owner and manager
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <br />
          <TextField
            type="input"
            required
            autoFocus
            name="name"
            label="Name"
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
            onChange={handleChange}
            fullWidth
          />

          <br />
          <br />
          {window.google === undefined ? (
            <LoadScript
              googleMapsApiKey={CONSTANTS.googleApi}
              libraries={["places"]}
            >
              <AddressAutocomplete onSelect={handleSelectAddress} />
            </LoadScript>
          ) : (
            <AddressAutocomplete onSelect={handleSelectAddress} />
          )}

          <br />
          <TextField
            type="input"
            required
            name="addressLine2"
            label="Address Line 2"
            onChange={handleChange}
            fullWidth
          />

          <br />
          <br />
          <TextField
            type="input"
            required
            name="zipCode"
            label="Zip Code"
            onChange={handleChange}
            fullWidth
          />

          <DialogActions>
            <Button
              startIcon={<ClearIcon />}
              variant="contained"
              sx={{ mr: 1 }}
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ mr: 1 }}
              type="submit"
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
