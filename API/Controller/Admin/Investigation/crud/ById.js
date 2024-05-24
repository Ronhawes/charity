const prisma = require("../../../../Prisma");

const { ReadPic } = require("./../../../../Relax/Pic");

async function ById(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) {
      throw { custom: true, message: "Id required" };
    }

    const investigation = await prisma.investigation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!investigation) {
      throw { custom: true, message: "Investigation  not found" };
    }

    if (investigation?.nano_pic) {
      const pic = await ReadPic(investigation.nano_pic);
      investigation.nano_pic = pic?.pic || null;
      investigation.nano_pic_ic = investigation?.nano_pic || null;
    }

    return res.status(200).json(investigation);
  } catch (e) {
    next(e);
  }
}

module.exports = ById;
