const addDocument = require("./../../Document/Add");

const path = require("path");

const { relaxDirectory } = require("../../../Utils/media");

const fs = require("fs");

async function testAddDocument(req, res, next) {
  try {
    const filename = req.fileName;

    console.log("root path", relaxDirectory(__dirname));

    if (!filename) {
      throw { custom: true, message: "File not found" };
    }

    const relaxAddDocument = await addDocument({ filename });

    if (!relaxAddDocument?.id) {
      throw { custom: true, message: "Failed to add document" };
    }

    return res.status(201).json({
      server_message: "Document added successfully",
      relax: relaxAddDocument,
    });
  } catch (e) {
    next(e);
  } finally {
    try {
      const filename = req.fileName;
      if (!filename) {
        return;
      }
      const relax_path = relaxDirectory(__dirname);
      if (!relax_path) return;
      const file_path = path.join(relax_path, filename);
      console.log("File path: " + file_path);
      fs.unlink(file_path, (err) => {
        if (err) {
          console.log("Error deeleteting file", err);
        }
      });
    } catch (e) {
      console.log("Clean up error.");
      console.log(e);
    }
  }
}

module.exports = testAddDocument;
