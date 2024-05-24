const nano = require("./../nano");
async function Read(id) {
  try {
    if (typeof id !== "string") {
      return false;
    }

    const db = await nano.use("pics");

    const record = await db.get(id);

    return record;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = Read;
