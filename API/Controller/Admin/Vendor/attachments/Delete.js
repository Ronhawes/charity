const prisma = require("../../../../Prisma");
const deleteRecord = require("../../../../Relax/Document/Delete");

async function deleteVendorAtachment(req, res, next) {
  try {
    const { id } = req.query;
    if (!id) {
      throw { custom: true, message: "Id is required" };
    }

    const vendor_attachment = await prisma.vendor_attachment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!vendor_attachment) {
      throw { custom: true, message: "Vendor attachment not found" };
    }

    const document_deleted = await deleteRecord(vendor_attachment.nano);

    if (!document_deleted) {
      throw { custom: true, message: "Failed to delete vendor attachment" };
    }

    await prisma.vendor_attachment.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ server_message: "Vendor attachment deleted successfully" });
  } catch (e) {
    next(e);
  }
}

module.exports = deleteVendorAtachment;
