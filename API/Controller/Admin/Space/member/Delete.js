const prisma = require("../../../../Prisma");
async function delete_space_member(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Space Member id required" };
    }

    const deleted_space_member = await prisma.space_member.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_space_member,
      server_message: `Member removed from space`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_space_member;
