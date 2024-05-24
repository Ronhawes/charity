const prisma = require("../../../Prisma");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const form = await prisma.form.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!form) {
      throw { custom: true, message: "Form with id not found" };
    }

    return res.status(200).json(form);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
