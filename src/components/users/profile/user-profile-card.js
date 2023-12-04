import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Badge,
} from "@mui/material";

export default function UserProfileCard(props) {
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
                src={props.userData.picture}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" align="center">
                {props.userData.nickname}
              </Typography>
              <Typography color="text.secondary" variant="body2" align="center">
                {props.userData.name}{" "}
                {props.userData["expresso-log/roles"].map((role) => (
                  <Badge
                    key={`role-badge-${role}`}
                    sx={{ marginLeft: "30px" }}
                    badgeContent={role}
                    color="info"
                    invisible={false}
                  />
                ))}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
