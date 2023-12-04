import React, { useEffect, useState } from "react";
import PlusIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import AddEstablishmentDialog from "../../components/establishments/add-establishment.component";
import {
  useAddEstablishmentMutation,
  useDeleteEstablishmentMutation,
  useGetAllEstablishmentsMutation,
  usePatchEstablishmentMutation,
} from "../../features/api/establishment.api";
import UpdateEstablishmentDialog from "../../components/establishments/update-establishment.component";
import { DeleteEstablishmentDialog } from "../../components/establishments/delete-establishment.component";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// DevExtreme Imports
import { DataGrid } from "devextreme-react";
import {
  Column,
  ColumnChooser,
  FilterPanel,
  FilterRow,
  GroupPanel,
  Grouping,
  HeaderFilter,
} from "devextreme-react/data-grid";

export default function EstablishmentsPage() {
  const [establishmentsData, setEstablishmentsData] = useState();
  const [loading, setLoading] = useState(true);
  const [establishmentToUpdate, setEstablishmentToUpdate] = useState();
  const [establishmentToDelete, setEstablishmentToDelete] = useState();

  // API Mutations
  const [getAllEstablishments] = useGetAllEstablishmentsMutation();
  const [addEstablishment] = useAddEstablishmentMutation();
  const [patchEstablishment] = usePatchEstablishmentMutation();
  const [deleteEstablishment] = useDeleteEstablishmentMutation();

  // Open Add Dialog States
  const [openAddEstablishmentDialog, setOpenAddEstablishmentDialog] =
    useState(false);

  const handleOpenAddEstablishmentDialogClickOpen = () => {
    setOpenAddEstablishmentDialog(true);
  };

  const handleOpenAddEstablishmentDialogClickClose = () => {
    setOpenAddEstablishmentDialog(false);
  };

  // Open Update Dialog States
  const [openUpdateEstablishmentForm, setOpenUpdateEstablishmentForm] =
    useState(false);

  // Update Dialog
  useEffect(() => {
    if (establishmentToUpdate) {
      setOpenUpdateEstablishmentForm(true);
    }
  }, [establishmentToUpdate]);

  const handleOpenUpdateDialog = (data) => {
    setEstablishmentToUpdate(data);
  };

  // Open Delete Dialog States
  const [deleteEstablishmentDialogOpen, setDeleteEstablishmentDialogOpen] =
    useState(false);

  // Delete Dialog
  useEffect(() => {
    if (establishmentToDelete) {
      setDeleteEstablishmentDialogOpen(true);
    }
  }, [establishmentToDelete]);

  const handleOpenDeleteDialog = (data) => {
    setEstablishmentToDelete(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEstablishments();
        setEstablishmentsData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const buttonsRender = (e) => {
    return (
      <div>
        <Tooltip title="Edit Establishment" arrow>
          <span>
            <IconButton
              color="secondary"
              onClick={() => handleOpenUpdateDialog(e.data)}
              aria-label="Edit"
              size="small"
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Delete Establishment" arrow>
          <span>
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteDialog(e.data)}
              aria-label="Delete"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  };

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
                <Typography variant="h4">Establishments</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={handleOpenAddEstablishmentDialogClickOpen}
                >
                  Add
                </Button>
              </div>
            </Stack>

            {establishmentsData && (
              <AddEstablishmentDialog
                open={openAddEstablishmentDialog}
                handleClose={handleOpenAddEstablishmentDialogClickClose}
                handleSubmit={addEstablishment}
              />
            )}

            {establishmentToDelete && (
              <DeleteEstablishmentDialog
                open={deleteEstablishmentDialogOpen}
                handleClose={() => {
                  setEstablishmentToDelete(null);
                  setDeleteEstablishmentDialogOpen(false);
                }}
                handleDelete={deleteEstablishment}
                establishmentToDelete={establishmentToDelete}
              />
            )}

            {establishmentToUpdate && (
              <UpdateEstablishmentDialog
                open={openUpdateEstablishmentForm}
                handleClose={() => {
                  setEstablishmentToUpdate(null);
                  setOpenUpdateEstablishmentForm(false);
                }}
                handleSubmit={patchEstablishment}
                establishmentData={establishmentToUpdate}
              />
            )}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataGrid
                dataSource={establishmentsData}
                showColumnLines={true}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}
                id="wavesDataTable"
                columnHidingEnabled={true}
                width="100%"
              >
                <FilterRow visible={true} applyFilter="auto" />
                <HeaderFilter visible="true" />
                <GroupPanel visible={true} />
                <Grouping contextMenuEnabled={true} expandMode="rowClick" />
                <FilterPanel visible={false} />
                <GroupPanel
                  visible={true}
                  emptyPanelText="Use the context menu of header columns to group data"
                />
                <ColumnChooser enabled={true} mode="select" />
                <Column width={75} cellRender={buttonsRender}></Column>
                <Column
                  allowGrouping={false}
                  dataField="id"
                  width={40}
                  caption="ID"
                />
                <Column dataField="name" caption="Name" />
                <Column dataField="address" caption="Address" />
                <Column dataField="ownerName" caption="Owner" />
                <Column dataField="managerName" caption="Manager" />
                <Column dataField="createdAt" caption="Created At" />
                <Column dataField="updatedAt" caption="Updated At" />
              </DataGrid>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
