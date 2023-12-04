import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Spinner from "../components/shared/spinner";
import { useSelector } from "react-redux";
import UserProfileCard from "../components/users/profile/user-profile-card";
import UserProfileDetails from "../components/users/profile/user-profile-details";

export default function UserProfilePage() {
  const { profile: userProfile } = useSelector((state) => state.user);

  if (!userProfile) return <Spinner />;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Your profile</Typography>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ marginRight: "24px" }}>
                <UserProfileCard userData={userProfile} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Box sx={{ marginRight: "24px" }}>
                <UserProfileDetails userData={userProfile} />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
