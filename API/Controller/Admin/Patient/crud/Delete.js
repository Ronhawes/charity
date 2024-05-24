const prisma = require("../../../../Prisma");
async function delete_patient(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Patient id required" };
    }

    const deleted_patient = await prisma.patient.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_patient,
      server_message: `Patient ${deleted_patient?.name || ""} deleted`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_patient;
