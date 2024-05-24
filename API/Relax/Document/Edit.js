const Add = require("./Add");

const DeleteDocument = require("./Delete");

const nano = require("./../nano");

async function Edit({ filename = "", id }) {
  try {
    if (!filename) {
      return false;
    }

    const db = await nano.use("documents");

    const record = await db.get(id);

    console.log(record);

    if (!record) return false;

    const added = await Add({ filename });
    console.log(added);

    if (!added) return false;

    const deletedDoc = await DeleteDocument(id);

    if (!deletedDoc) {
      return false;
    }

    return added.id;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = Edit;
