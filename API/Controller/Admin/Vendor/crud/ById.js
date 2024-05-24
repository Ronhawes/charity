const prisma = require("../../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!vendor) {
      throw { custom: true, message: "Vendor  not found" };
    }

    return res.status(200).json(vendor);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
