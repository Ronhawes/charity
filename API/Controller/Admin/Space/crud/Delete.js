const prisma = require("../../../../Prisma");
async function delete_space(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Patient id required" };
    }

    const deleted_space = await prisma.space.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_space,
      server_message: `Space deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_space;
