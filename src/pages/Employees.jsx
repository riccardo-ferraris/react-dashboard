import React from "react";
import { employeesData } from "../data/employeesData";
import { Header } from "../components";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const rows = employeesData.map((employee, index) => ({
  id: employee.EmployeeID + " - " + index,
  ...employee,
}));

const columns = [
  {
    field: "EmployeeImage",
    headerName: "Avatar",
    minWidth: 80,
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
  { field: "EmployeeID", headerName: "ID", minWidth: 100, flex: 0.5 },
  { field: "Name", headerName: "Name", minWidth: 180, flex: 1.5 },
  { field: "Title", headerName: "Title", minWidth: 150, flex: 1.5 },
  { field: "HireDate", headerName: "Hire Date", minWidth: 120, flex: 1 },
  { field: "Country", headerName: "Country", minWidth: 120, flex: 1 },
  { field: "ReportsTo", headerName: "Reports To", minWidth: 130, flex: 1 },
];

const Employees = () => {
  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
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

export default Employees;
