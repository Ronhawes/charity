const prisma = require("../../../../Prisma");
async function delete_procedure_space(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "procedure Space required" };
    }

    const deleted_procedure_space = await prisma.procedure_space.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_procedure_space,
      server_message: `procedure removed from space`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_procedure_space;
