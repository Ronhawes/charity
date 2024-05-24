const prisma = require("../../../../Prisma");
async function delete_kin(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Kin id required" };
    }

    const deleted_kin = await prisma.patient_kin.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_kin,
      server_message: `Next of kin deleted`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_kin;
