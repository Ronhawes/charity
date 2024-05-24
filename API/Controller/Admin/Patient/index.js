const Allergie = require("./allergie");
const Kin = require("./kin");

const Add = require("./crud/Add");
const Edit = require("./crud/Edit");
const DeletePatient = require("./crud/Delete");
const ById = require("./crud/ById");

const Search = require("./Search");

const List = require("./List");
const Media = require("./Media");

module.exports = {
  Allergie,
  Kin,
  Add,
  Edit,
  DeletePatient,
  ById,
  List,
  Media,
  Search,
};
