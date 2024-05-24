const nano = require("./../nano");

const createDb = require("./../Utils/createDb");

async function insertRecord({ doc = null, dbName = "" }) {
  try {
    if (!dbName) {
      return false;
    }

    if (typeof dbName !== "string") {
      return false;
    }

    if (typeof doc !== "object") {
      return false;
    }
    const createIfNotExists = await createDb(dbName);

    if (createIfNotExists === false) {
      return false;
    }

    const db = await nano.use(dbName);

    const record = await db.insert(doc);
    return record;
  } catch (e) {
    return false;
  }
}

module.exports = insertRecord;
