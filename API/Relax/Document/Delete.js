const nano = require("./../nano");

async function deleteRecord(id) {
  try {
    const db = await nano.use("documents");

    const record = await db.get(id);

    if (!record) return false;

    const doc = await db.attachment.get(record._id, record._id, {
      rev: record._rev,
    });

    await db.destroy(record._id, record._rev);

    return true;
  } catch (e) {
    return false; // At least one operation failed
  }
}

module.exports = deleteRecord;
