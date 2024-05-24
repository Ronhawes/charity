const fixed_asset_category = [
  {
    id: 1,
    name: "Medical Equipment",
    description: "",
  },
  { id: 2, name: "Doctor Equipment", description: "" },
  { id: 3, name: "Computer" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Furniture", description: "" },
];

const fixed_asset_status = [];

const inventory_category = [
  { id: 1, name: "Medicine", description: "" },
  {
    id: 2,
    name: "Lab Reagents",
  },
  {
    id: 3,
    name: "Cleaning Equipment",
  },
];

const inventory_status = [
  {
    id: 1,
    name: "Active",
    description: "",
  },
  {
    id: 2,
    name: "Deactivated",
    description: "",
  },
];

const uom = [
  { id: 1, name: "Gram", description: "" },
  {
    id: 2,
    name: "Millilitre",
    description: "",
  },
  {
    id: 3,
    name: "Litre",
    description: "",
  },
  {
    id: 4,
    name: "Tablet",
    description: "",
  },
  {
    id: 5,
    name: "Kg",
    description: "",
  },
];

const purchase_order_status = [
  {
    id: 1,
    name: "Pending",
    description: "",
  },
  {
    id: 2,
    name: "Approval Request",
    description: "",
  },
  {
    id: 3,
    name: "Approved",
    description: "",
  },
  {
    id: 4,
    name: "Canceled",
    description: "",
  },
  {
    id: 5,
    name: "Sent To Vendor",
    description: "",
  },
  {
    id: 6,
    name: "Received",
    description: "",
  },
  {
    id: 7,
    name: "Partially Received",
    description: "",
  },
];

const payment_status = [
  { id: 1, name: "Pending", description: "" },
  { id: 2, name: "Partial", description: "" },
  { id: 2, name: "Paid", description: "" },
];

const allocation_status = [
  { id: 1, name: "Pending", description: "" },
  {
    id: 2,
    name: "Approved",
    description: "",
  },
  { id: 3, name: "Canceled", description: "" },
];

module.exports = {
  fixed_asset_category,
  fixed_asset_status,
  inventory_category,
  inventory_status,
  uom,
  purchase_order_status,
  payment_status,
  allocation_status,
};
