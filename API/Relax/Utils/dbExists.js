const nano = require("./../nano");

async function checkIfDataBaseExists(dbName) {
  try {
    await nano.db.get(dbName);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = checkIfDataBaseExists;
