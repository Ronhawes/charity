const prisma = require("../../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const member = await prisma.member.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!member) {
      throw { custom: true, message: "Member with id not found" };
    }

    return res.status(200).json(member);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
