const insertRecord = require("./../../Utils/insertRecord");

async function testInsertRecord(req, res, next) {
  try {
    const { record, dbName } = req.body;
    const result = await insertRecord({
      doc: record,
      dbName: dbName,
    });

    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
}

module.exports = testInsertRecord;
