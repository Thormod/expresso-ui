import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";

export default function UserProfileDetails(props) {
  return (
    <Card>
      <CardHeader subheader="The information can't be edited" title="Profile" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled={true}
                label="Given Name"
                name="givenName"
                value={props.userData.given_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled={true}
                label="Family Name"
                name="familyName"
                value={props.userData.family_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                disabled={true}
                label="Email"
                name="email"
                value={props.userData.email}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
