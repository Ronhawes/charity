const prisma = require("../../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!patient) {
      throw { custom: true, message: "Patient with id not found" };
    }

    return res.status(200).json(patient);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
