import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <Box
      data-testid="spinner"
      sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
    >
      <CircularProgress size={100} />
    </Box>
  );
}
