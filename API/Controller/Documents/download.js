const ReadDoc = require("./../../Relax/Document/Read");

async function downloadDoc(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Document id required" };
    }

    const { doc, content_type } = await ReadDoc(id);

    res.set("Content-Type", content_type);
    res.set("Content-Disposition", `attachment; filename="${id}"`);

    return res.send(doc);
  } catch (e) {
    next(e);
  }
}

module.exports = downloadDoc;
