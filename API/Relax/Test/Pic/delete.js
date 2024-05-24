const deletePic = require("./../../Pic/Delete");

async function testDelete(req, res, next) {
  try {
    const { id } = req.query;

    const result = deletePic(id);

    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
}

module.exports = testDelete;
