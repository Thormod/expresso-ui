import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import { List, ListItem, Paper } from "@mui/material";

const AddressAutocomplete = ({ onSelect, defaultValue }) => {
  const [address, setAddress] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setAddress(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = async (value) => {
    setAddress(value);

    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      onSelect({ address: value, latLng });
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          <TextField
            {...getInputProps()}
            label="Enter Address"
            fullWidth
            key="autocomplete-input"
          />
          <Paper>
            <List>
              {suggestions.map((suggestion) => (
                <ListItem
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.id}
                  button={true}
                >
                  {suggestion.description}
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;
