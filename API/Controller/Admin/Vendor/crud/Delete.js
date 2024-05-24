const prisma = require("../../../../Prisma");
async function delete_vendor(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Vendor id required" };
    }

    const deleted_vendor = await prisma.vendor.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_vendor,
      server_message: `Vendor deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_vendor;
