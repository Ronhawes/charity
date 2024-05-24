const prisma = require("../../../../Prisma");

async function delete_member(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Member id required" };
    }

    const deleted_member = await prisma.member.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_member,
      erver_message: `Member ${deleted_member?.name || ""} deleted`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_member;
