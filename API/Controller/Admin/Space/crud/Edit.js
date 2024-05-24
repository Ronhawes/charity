const { AddPic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { name, code, type_id, nano_pic, color_code, id } = req.body;

    if (!id) {
      throw { custom: true, message: "Space id is required" };
    }

    const space = await prisma.space.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!space) {
      throw { custom: true, message: "Space not found" };
    }

    const data = {};

    if (name) {
      data.name = name;
    }

    if (code) {
      data.code = code;
    }

    if (type_id) {
      data.type_id = parseInt(type_id);
    }

    if (color_code) {
      data.color_code = color_code;
    }

    if (nano_pic) {
      if (space.nano_pic) {
        let newPic = await UpdatePic({
          id: space.nano_pic,
          table: "space",
          base64: nano_pic,
        });
        data.nano_pic = nano_pic?.id || space.nano_pic;
      } else {
        const relax = await AddPic({
          base64: nano_pic,
          table: "space",
        });

        data.nano_pic = relax?.id || space.nano_pic;
      }
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updatedSpace = await prisma.space.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updatedSpace,
      server_message: "Space updated successfully",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
