const prisma = require("./../../../Prisma");

async function delete_role(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Role id required" };
    }

    const deleted_role = await prisma.role.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_role,
      server_message: `Role ${deleted_role?.name || ""} deleted`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_role;
