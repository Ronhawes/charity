const readPic = require("./../../Pic/Read");

async function testRead(req, res, next) {
  try {
    const { id } = req.query;

    console.log(req.query);

    const result = await readPic(id);

    return res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
}

module.exports = testRead;
