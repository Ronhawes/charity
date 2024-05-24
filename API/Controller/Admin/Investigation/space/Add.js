const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const { space_id, investigation_id } = req.body;

    if (!investigation_id || !space_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    let space = prisma.space.findUnique({
      where: {
        id: parseInt(space_id),
      },
    });

    let investigation = prisma.investigation.findUnique({
      where: {
        id: parseInt(investigation_id),
      },
    });

    let investigation_space = prisma.investigation_space.findFirst({
      where: {
        space_id: parseInt(space_id),
        investigation_id: parseInt(investigation_id),
      },
    });

    const tx = await prisma.$transaction([
      space,
      investigation,
      investigation_space,
    ]);

    const [t_space, t_investigation, t_investigation_space] = tx;

    if (!t_space) {
      throw { custom: true, message: "Space not found" };
    }

    if (!t_investigation) {
      throw { custom: true, message: "Investigation not found" };
    }

    if (t_investigation_space) {
      throw { custom: true, message: "Investigation assigned to space" };
    }

    const new_investigation_space = await prisma.investigation_space.create({
      data: {
        space_id: parseInt(space_id),
        investigation_id: parseInt(investigation_id),
      },
    });

    return res.status(201).json({
      ...new_investigation_space,
      server_message: "Investigation added to space successfully",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
