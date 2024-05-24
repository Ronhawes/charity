const nano = require("./../nano");
const Read = require("./Read");

async function Update({ id = "", base64 = null, table = "" }) {
  try {
    if (typeof id !== "string") {
      return false;
    }

    let doc = {};

    if (base64) {
      doc.pic = base64;
    }

    if (table) {
      doc.table = table;
    }
    let record = await Read(id);

    if (!record) {
      return false;
    }

    doc = { ...record, ...doc };

    doc._rev = record._rev;

    const db = nano.use("pics");

    const updated = await db.insert(doc);

    return updated;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = Update;
