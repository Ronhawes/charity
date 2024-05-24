const nano = require("./../nano");
const Read = require("./Read");

async function deleteRecord(id) {
  try {
    if (typeof id !== "string") {
      return false;
    }

    const record = await Read(id);

    if (!record) {
      return false;
    }

    const db = nano.use("pics");
    await db.destroy(record._id, record._rev);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = deleteRecord;
