const editDocument = require("./../../Document/Edit");

const addDocument = require("./../../Document/Add");

const path = require("path");

const { relaxDirectory } = require("../../../Utils/media");

const fs = require("fs");

async function testEdit(req, res, next) {
  try {
    const { id } = req.query;

    const filename = req.fileName;

    if (!id) {
      throw { custom: true, message: "Document id required" };
    }
    if (!filename) {
      throw { custom: true, message: "File not found" };
    }

    const relaxUpdate = await editDocument({ id, filename });

    if (!relaxUpdate) {
      throw { custom: true, message: "Document updated failed" };
    }

    return res.status(201).json({
      server_message: "Document updated successfully",
      relax: relaxUpdate,
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
      //console.log("File path: " + file_path);
      fs.unlink(file_path, (err) => {
        if (err) {
          // console.log("Error deeleteting file", err);
        }
      });
    } catch (e) {
      console.log("Clean up error.");
      // console.log(e);
    }
  }
}

module.exports = testEdit;
