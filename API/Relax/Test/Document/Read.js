const ReadDocument = require("./../../Document/Read");

async function Read(req, res, next) {
  try {
    const { id } = req.query;

    console.log(id);

    if (!id) {
      throw { custom: true, message: "Document id required" };
    }

    const { doc, content_type } = await ReadDocument(id);

    res.set("Content-Type", content_type);
    res.set("Content-Disposition", `attachment; filename="${id}"`);

    return res.send(doc);
  } catch (e) {
    next(e);
  }
}

module.exports = Read;
