const prisma = require("../../../Prisma");

const { ReadPic } = require("./../../../Relax/Pic");

async function Media(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Patient id required" };
    }

    const space = await prisma.space.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!space) {
      throw { custom: true, message: `Space does not exist` };
    }

    const data = {
      nano_pic: null,
    };

    if (space?.nano_pic) {
      let nano_pic = await ReadPic(space.nano_pic);
      data.nano_pic = nano_pic || null;
    }

    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = Media;
