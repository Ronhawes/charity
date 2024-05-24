const { AddPic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const { name, code, type_id, nano_pic, color_code } = req.body;

    if (!name || !code || !type_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    const data = {
      name,
      code,
      type_id: parseInt(type_id),
      color_code: color_code || null,
    };

    if (nano_pic) {
      const relax = await AddPic({
        base64: nano_pic,
        table: "space",
      });

      data.nano_pic = relax?.id || null;
    }

    const space = await prisma.space.create({ data });
    return res
      .status(201)
      .json({ ...space, server_message: "Space created successfully" });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
