const checkIfDataBaseExists = require("./../../Utils/dbExists");

async function dbExisits(req, res, next) {
  try {
    const { name = "db" } = req.query;
    let result = await checkIfDataBaseExists(name);
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
}

module.exports = dbExisits;
