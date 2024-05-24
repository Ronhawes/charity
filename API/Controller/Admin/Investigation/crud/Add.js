const { AddPic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Investigation(req, res, next) {
  try {
    const { name, code, charge, info, time, nano_pic, form_id } = req.body;

    if (!name || !code || !charge || !time) {
      throw { custom: true, message: "Required field missing" };
    }

    const data = {
      name: name,
      code: code,
      charge: parseInt(charge),
      info: info || null,
      time: parseInt(time),
      form_id: parseInt(form_id),
    };

    if (nano_pic) {
      const relax = await AddPic({
        base64: nano_pic,
        table: "patient",
      });

      data.nano_pic = relax?.id || null;
    }

    const investigation = await prisma.investigation.create({
      data,
    });

    return res
      .status(200)
      .json({ ...investigation, server_message: "Investigation created" });
  } catch (e) {
    next(e);
  }
}

module.exports = Investigation;
