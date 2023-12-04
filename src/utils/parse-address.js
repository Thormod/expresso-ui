export const parseAddressComponents = (addressObj) => {
  const parts = addressObj.address.split(", ");
  const smallAddress = parts[parts.length - 4];
  const googleMapsLink = `https://www.google.com/maps?q=${addressObj.latLng.lat},${addressObj.latLng.lng}`;
  const city = parts[parts.length - 3];
  const stateZip = parts[parts.length - 2].split(" ");
  const state = stateZip[0];

  console.log(googleMapsLink);

  return {
    address: addressObj.address,
    city,
    state,
    smallAddress,
    googleMapsLink,
  };
};
