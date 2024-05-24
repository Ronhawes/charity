const prisma = require("../../../Prisma");

const { ReadPic } = require("../../../Relax/Pic");

async function Media(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Investigation id required" };
    }

    const procedure = await prisma.procedure.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!procedure) {
      throw { custom: true, message: `Procedure does not exist` };
    }

    const data = {
      nano_pic: null,
    };

    if (procedure?.nano_pic) {
      let nano_pic = await ReadPic(procedure.nano_pic);
      data.procedure = nano_pic || null;
    }

    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = Media;
