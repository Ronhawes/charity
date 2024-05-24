const prisma = require("../../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const procedure = await prisma.procedure.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!procedure) {
      throw { custom: true, message: "Procedure  not found" };
    }

    return res.status(200).json(procedure);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
