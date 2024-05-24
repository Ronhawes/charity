const prisma = require("../../../../Prisma");
async function delete_investigation(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Investigation id required" };
    }

    const deleted_procedure = await prisma.investigation.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_procedure,
      server_message: `Investigation deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_investigation;
