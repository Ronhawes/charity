const prisma = require("../../../Prisma");

const { ReadPic } = require("./../../../Relax/Pic");

async function Media(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Investigation id required" };
    }

    const investigation = await prisma.investigation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!investigation) {
      throw { custom: true, message: `Patient does not exist` };
    }

    const data = {
      nano_pic: null,
    };

    if (investigation?.nano_pic) {
      let nano_pic = await ReadPic(investigation.nano_pic);
      data.investigation = nano_pic || null;
    }

    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = Media;
