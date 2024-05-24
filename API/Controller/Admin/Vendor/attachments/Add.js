const addDocument = require("./../../../../Relax/Document/Add");

const path = require("path");

const { relaxReadDirectory } = require("./../../../../Utils/media");

const { relaxDirectory } = require("./../../../../Utils/media");

const fs = require("fs");

const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const filename = req.fileName;

    const { id } = req.query;

    if (!filename) {
      throw { custom: true, message: "File not found" };
    }

    if (!id) {
      throw { custom: true, message: "Vendor id required" };
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!vendor) {
      throw { custom: true, message: "Vendor not found" };
    }

    const added_doc = await addDocument({ filename });

    if (!added_doc?.id) {
      throw { custom: true, message: "Document upload failed" };
    }

    const vendor_attachment = await prisma.vendor_attachment.create({
      data: {
        vendor_id: parseInt(id),
        nano: added_doc.id,
      },
    });

    return res.status(201).json({
      ...vendor_attachment,
      server_message: "Document added succefully",
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

module.exports = Add;
