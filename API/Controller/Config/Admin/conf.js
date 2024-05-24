const gender = [
  { id: 1, name: "Male", description: "Male gender" },
  {
    id: 2,
    name: "Female",
    description: "Female gender",
  },
  {
    id: 3,
    name: "Other",
    description: "Prefer not to say",
  },
];

const staff_title = [
  { id: 1, name: "Mr.", description: "" },
  { id: 2, name: "Mrs.", description: "" },
  { id: 3, name: "Miss.", description: "" },
  { id: 4, name: "Miss", description: "" },
  { id: 5, name: "Dr", description: "" },
  { id: 6, name: "Eng", description: "" },
];

const staff_type = [
  { id: 1, name: "Doctor", description: "" },
  { id: 2, name: "Nurse", description: "" },
  { id: 3, name: "Cashier", description: "" },
  { id: 4, name: "Admin", description: "" },
  { id: 5, name: "Other", description: "" },
];

const religion = [
  { id: 1, name: "Christian", description: "" },
  {
    id: 2,
    name: "Muslim",
    description: "",
  },
  {
    id: 3,
    name: "Pangan",
    description: "",
  },
];

const relationship = [
  { id: 1, name: "Mom", description: "" },
  {
    id: 2,
    name: "Dad",
    description: "",
  },
  {
    id: 3,
    name: "Brother",
    description: "",
  },
  {
    id: 4,
    name: "Aunt",
    description: "",
  },
];

const space_type = [
  {
    id: 1,
    name: "Consulation",
    description: "",
  },
  {
    id: 2,
    name: "Reception",
    description: "",
  },
  {
    id: 3,
    name: "Lab",
    description: "",
  },
  {
    id: 4,
    name: "Pharmacy",
    description: "",
  },
  {
    id: 5,
    name: "Triage",
    description: "",
  },
];

const form_type = [
  { id: 1, name: "Procedure Form", description: "", color_code: null },
  { id: 2, name: "Investigation Form", description: "", color_code: null },
  { id: 3, name: "Other", description: "", color_code: null },
];

const alergy_severity = [
  { id: 1, name: "Mild", description: "", color_code: null },
  { id: 2, name: "Moderate", description: "", color_code: null },
  { id: 3, name: "Severe", description: "", color_code: null },
];

module.exports = {
  gender,
  staff_title,
  staff_type,
  religion,
  relationship,
  space_type,
  form_type,
  alergy_severity,
};
