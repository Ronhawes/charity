const prisma = require("../../../Prisma");

const bcrypt = require("bcrypt");

async function AdminUpdatePassword(req, res, next) {
  try {
    const { new_password, id } = req.body;

    if (!new_password || !id) {
      throw { custom: true, message: "Required fields missing" };
    }

    if (typeof new_password !== "string") {
      throw { custom: true, message: "Invalid password" };
    }

    if (new_password.length < 5) {
      throw { custom: true, message: "Password must be at least 5 characters" };
    }

    const member = await prisma.member.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!member) {
      throw { custom: true, message: "Member not found" };
    }

    const pass = await bcrypt.hash(new_password, 10);

    const updatedMember = await prisma.member.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: pass,
      },
    });

    return res.status(200).json({ ...updatedMember });
  } catch (e) {
    next(e);
  }
}

module.exports = AdminUpdatePassword;
