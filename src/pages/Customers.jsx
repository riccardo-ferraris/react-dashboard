import React from "react";
import { Header } from "../components";
import { DataGrid } from "@mui/x-data-grid";
import { customersData } from "../data/customersData";
import { Box } from "@mui/material";

const rows = customersData.map((customer, index) => ({
  id: customer.CustomerID + " - " + index,
  ...customer,
}));

const columns = [
  {
    field: 'CustomerImage',
    headerName: 'Avatar',
    minWidth: 100,
        renderCell: (params) => (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Box
            component="img"
              src={params.value}
              alt="avatar"
              sx={{
                height: "100%",
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
          </Box>
        ),
    sortable: false,
    filterable: false,
    flex: 0.8,
  },
  { field: 'CustomerID', headerName: 'ID', minWidth: 90, flex: 0.5 },
  { field: 'CustomerName', headerName: 'Name', minWidth: 180, flex: 1.5 },
  { field: 'CustomerEmail', headerName: 'Email', minWidth: 200, flex: 1.5 },
  { field: 'ProjectName', headerName: 'Project', minWidth: 200, flex: 1.5 },
  {
    field: 'Status',
    headerName: 'Status',
    minWidth: 130,
    renderCell: (params) => (
      <span
        style={{
          backgroundColor: params.row.StatusBg,
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '5px',
          fontSize: '0.85rem',
        }}
      >
        {params.value}
      </span>
    ),
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  { field: 'Weeks', headerName: 'Weeks', minWidth: 100, flex: 0.8 },
  { field: 'Budget', headerName: 'Budget', minWidth: 100, type: 'number', flex: 1 },
  { field: 'Location', headerName: 'Location', minWidth: 120, flex: 1 },
];

const Customers = () => {
  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <Box sx={{ position: "absolute", inset: 0, overflowX: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
            getRowHeight={() => 80}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Customers;
