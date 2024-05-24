const delDoc = require("./../../Document/Delete");

async function deleteDocument(req, res, next) {
  try {
    const { id } = req.query;
    if (!id) {
      throw { custom: true, message: "Document id required" };
    }

    const record_deleted = await delDoc(id);

    if (!record_deleted) {
      throw { cusom: true, message: "Failed to delete document" };
    }

    return res
      .status(200)
      .json({ server_message: "Record deleted successfully" });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = deleteDocument;
