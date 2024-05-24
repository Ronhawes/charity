const nano = require("./../nano");
const path = require("path");

const fs = require("fs");

const createDb = require("./../Utils/createDb");
const { relaxDirectory } = require("./../../Utils/media");
const mime = require("mime-types");

async function Add({ filename = "" }) {
  try {
    if (!filename) {
      return false;
    }

    const relax_path = relaxDirectory(__dirname);

    if (!relax_path) {
      return false;
    }

    const file_path = path.join(relax_path, filename);

    if (!fs.existsSync(file_path)) {
      return false;
    }

    const createDbResult = await createDb("documents");

    if (!createDbResult) {
      return false;
    }

    const documents = await nano.use("documents");

    const data = fs.readFileSync(file_path);

    const content_type =
      mime.contentType(filename) || "application/octet-stream";

    const insertedAttachement = await documents.attachment.insert(
      filename,
      filename,
      data,
      content_type
    );

    return insertedAttachement;
  } catch (e) {
    console.log("Added failed", e);
    return false;
  }
}

module.exports = Add;
