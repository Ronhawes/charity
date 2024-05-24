const updatepic = require("./../../Pic/Update");

async function testUpdate(req, res, next) {
  try {
    const { id, base64, table } = req.body;

    const result = await updatepic({ id, base64, table });

    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
}

module.exports = testUpdate;
