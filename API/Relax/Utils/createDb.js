const nano = require("./../nano");
const checkIfDataBaseExists = require("./dbExists");

async function createDb(dbName) {
  try {
    let exists = await checkIfDataBaseExists(dbName);
    if (exists) {
      return true;
    }
    await nano.db.create(dbName);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = createDb;
