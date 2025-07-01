import React from "react";
import { Header } from "../components";
import { DataGrid } from "@mui/x-data-grid";
import { ordersData } from "../data/ordersData";
import { Chip, Box } from "@mui/material";

const rows = ordersData.map((order, index) => ({
  id: order.OrderID + " - " + index,
  ...order,
}));

const columns = [
  {
    field: "ProductImage",
    headerName: "Image",
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
          src={typeof params.value === "string" ? params.value : ""}
          alt="Product"
          sx={{
            height: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: 1,
          }}
        />
      </Box>
    ),
    sortable: false,
    filterable: false,
    flex: 0.5,
  },
  { field: "OrderID", headerName: "Order ID", minWidth: 100, flex: 0.8 },
  { field: "OrderItems", headerName: "Item", minWidth: 180, flex: 1.5 },
  { field: "CustomerName", headerName: "Customer", minWidth: 150, flex: 1.5 },
  { field: "Location", headerName: "Location", minWidth: 120, flex: 1 },
  {
    field: "TotalAmount",
    headerName: "Amount ($)",
    minWidth: 120,
    type: "number",
    flex: 1,
  },
  {
    field: "Status",
    headerName: "Status",
    minWidth: 130,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Chip
          label={params.value}
          style={{
            backgroundColor: params.row.StatusBg,
            color: "#fff",
            textTransform: "capitalize",
          }}
        />
      </Box>
    ),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

const Orders = () => {
  return (
    <div className="mx-2 md:mx-10 md:p-10 p-5 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
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

export default Orders;
