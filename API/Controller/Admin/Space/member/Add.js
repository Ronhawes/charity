const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const { space_id, member_id } = req.body;

    if (!space_id || !member_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    let space = prisma.space.findUnique({
      where: {
        id: parseInt(space_id),
      },
    });

    let member = prisma.member.findUnique({
      where: {
        id: parseInt(member_id),
      },
    });

    let space_member = prisma.space_member.findFirst({
      where: {
        space_id: parseInt(space_id),
        member_id: parseInt(member_id),
      },
    });

    const tx = await prisma.$transaction([space, member, space_member]);

    const [t_space, t_member, t_space_member] = tx;

    if (!t_space) {
      throw { custom: true, message: "Space not found" };
    }

    if (!t_member) {
      throw { custom: true, message: "Member not found" };
    }

    if (t_space_member) {
      throw { custom: true, message: "Member assigned to space" };
    }

    const new_space_member = await prisma.space_member.create({
      data: {
        space_id: parseInt(space_id),
        member_id: parseInt(member_id),
      },
    });

    return res
      .status(201)
      .json({ ...new_space_member, server_message: "Space member created" });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
