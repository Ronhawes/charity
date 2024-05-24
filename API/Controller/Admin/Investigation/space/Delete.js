const prisma = require("../../../../Prisma");
async function delete_investigation_space(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Investigation Space required" };
    }

    const deleted_investigation_space = await prisma.investigation_space.delete(
      {
        where: {
          id: parseInt(id),
        },
      }
    );

    return res.status(200).json({
      ...deleted_investigation_space,
      server_message: `Investigation remove from space`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_investigation_space;
