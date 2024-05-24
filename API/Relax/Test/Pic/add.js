const addpic = require("./../../Pic/Add");

async function testAdd(req, res, next) {
  try {
    const { base64, table = "" } = req.body;

    const result = await addpic({ base64, table });

    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
}

module.exports = testAdd;
