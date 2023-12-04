import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";

export default function MachineProfileCard(props) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Avatar
                src={"https://m.media-amazon.com/images/I/719aSFieu6S.jpg"}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" align="center">
                {props.machineData.serial}
              </Typography>
              <Typography color="text.secondary" variant="body2" align="center">
                Model: {props.machineData.model}
              </Typography>
              <Typography color="text.secondary" variant="body2" align="center">
                Manufacturer: {props.machineData.manufacturer}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text">
          Start Request
        </Button>
      </CardActions>
    </Card>
  );
}
