const prisma = require("../../../Prisma");

const { ReadPic } = require("./../../../Relax/Pic");

async function Media(req, res, next) {
  try {
    const { id, pic, signature } = req.query;

    console.log(req.query);

    if (!id) {
      throw { custom: true, message: "User id required" };
    }

    const member = await prisma.member.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    console.log(member);

    if (!member) {
      throw { custom: true, message: `Member with ${id} does not exist` };
    }

    const data = {
      nano_pic: null,
      nano_signature: null,
    };

    if (pic && member?.nano_pic) {
      let nano_pic = await ReadPic(member.nano_pic);
      data.nano_pic = nano_pic || null;
    }

    if (signature && member?.nano_signature) {
      let nano_signature = await ReadPic(member.nano_signature);
      data.nano_signature = nano_signature || null;
    }

    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = Media;
