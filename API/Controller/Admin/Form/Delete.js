const prisma = require("../../../Prisma");

async function delete_member(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Form id required" };
    }

    const deleted_form = await prisma.form.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      ...deleted_form,
      server_message: `Form deleted successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = delete_member;
