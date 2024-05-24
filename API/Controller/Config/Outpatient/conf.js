const out_patient_type = [
  { id: 1, name: "Normal", description: "" },
  {
    id: 2,
    name: "To Pharmacy",
    description: "",
  },
  {
    id: 3,
    name: "To Lab",
    description: "",
  },
  {
    id: 4,
    name: "Referral",
    description: "",
  },
  {
    id: 5,
    name: "Follow Up",
    description: "",
  },
  {
    id: 6,
    name: "Emergency",
    description: "",
  },
];

const service_status = [
  { id: 1, name: "Pending", description: "", color_code: null },
  { id: 2, name: "Complete", description: "", color_code: null },
  { id: 3, name: "Current", description: "", color_code: null },
];

const patient_priority = [
  { id: 1, name: "Urgent", description: "", color_code: "red" },
  { id: 2, name: "Normal", description: "", color_code: "" },
];

module.exports = {
  out_patient_type,
  service_status,
  patient_priority,
};
