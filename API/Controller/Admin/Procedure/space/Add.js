const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const { space_id, procedure_id } = req.body;

    if (!procedure_id || !space_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    let space = prisma.space.findUnique({
      where: {
        id: parseInt(space_id),
      },
    });

    let procedure = prisma.procedure.findUnique({
      where: {
        id: parseInt(procedure_id),
      },
    });

    let procedure_space = prisma.procedure_space.findFirst({
      where: {
        space_id: parseInt(space_id),
        procedure_id: parseInt(procedure_id),
      },
    });

    const tx = await prisma.$transaction([space, procedure, procedure_space]);

    const [t_space, t_procedure, t_procedure_space] = tx;

    if (!t_space) {
      throw { custom: true, message: "Space not found" };
    }

    if (!t_procedure) {
      throw { custom: true, message: "Procedure not found" };
    }

    if (t_procedure_space) {
      throw { custom: true, message: "Procedure assigned to space" };
    }

    const new_procedure_space = await prisma.procedure_space.create({
      data: {
        space_id: parseInt(space_id),
        procedure_id: parseInt(procedure_id),
      },
    });

    return res.status(201).json({
      ...new_procedure_space,
      server_message: "procedure added to space successfully",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
