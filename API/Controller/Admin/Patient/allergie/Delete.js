const prisma = require("../../../../Prisma");
async function delete_allergie(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Patient id required" };
    }

    const deleted_allergie = await prisma.patient_allergie.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_allergie,
      server_message: `Allergie deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_allergie;
