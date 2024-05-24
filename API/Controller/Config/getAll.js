const prisma = require("./../../Prisma/index");

async function getAll(req, res, next) {
  try {
    const gender = prisma.gender.findMany();
    const staffTitle = prisma.staff_title.findMany();
    const staffType = prisma.staff_type.findMany();
    const role = prisma.role.findMany();
    const formType = prisma.form_type.findMany();

    const transactions = await prisma.$transaction([
      gender,
      staffTitle,
      staffType,
      role,
      formType,
    ]);

    return res.status(200).json({
      gender: transactions[0],
      staffTitle: transactions[1],
      staffType: transactions[2],
      role: transactions[3],
      formType: transactions[4],
    });
  } catch (e) {
    next(e);
  }
}

module.exports = getAll;
