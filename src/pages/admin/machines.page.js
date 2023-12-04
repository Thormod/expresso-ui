import React, { useCallback, useMemo, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PlusIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function MachinesPage() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Machines</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="primary"
                    startIcon={<ArrowUpwardIcon fontSize="small" />}
                  >
                    Import
                  </Button>
                  <Button
                    color="primary"
                    startIcon={<ArrowDownwardIcon fontSize="small" />}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
