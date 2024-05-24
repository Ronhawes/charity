const createDb = require("./../../Utils/createDb");

async function testCreateDb(req, res, next) {
  try {
    const { name = "db" } = req.query;
    let db = await createDb(name);
    return res.status(200).json(db);
  } catch (e) {
    next(e);
  }
}

module.exports = testCreateDb;
