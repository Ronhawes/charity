const prisma = require("./../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    let role = await prisma.role.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!role) {
      throw { custom: true, message: "Role not found" };
    }

    return res.status(200).json({
      ...role,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
