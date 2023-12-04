import { useParams } from "react-router-dom";
import { useGetMachineMutation } from "../features/api/machines.api";
import Spinner from "../components/shared/spinner";
import { useEffect, useState } from "react";
import MachineProfileCard from "../components/machines/profile/machine-profile-card";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export default function MachinesProfilePage() {
  const { machineId } = useParams();
  const [machine, setMachine] = useState();
  const [getMachine, { isLoading }] = useGetMachineMutation();

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        if (!machine) {
          const response = await getMachine(machineId);
          setMachine(response.data);
        }
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    };

    fetchMachineData();
  }, [machineId]);

  if (isLoading || !machine || !machineId) return <Spinner />;

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
            <Typography variant="h4">Machine</Typography>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ marginRight: "24px" }}>
                <MachineProfileCard machineData={machine} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}></Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
