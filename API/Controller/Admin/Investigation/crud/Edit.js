const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic, UpdatePic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { name, code, charge, info, time, nano_pic, form_id, id } = req.body;

    if (!id) {
      throw { custom: true, message: "Investigation id is required" };
    }

    const investigation = await prisma.investigation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!investigation) {
      throw { custom: true, message: "Investigation with id not found" };
    }

    const data = {};

    if (name) {
      data.name = name;
    }

    if (code) {
      data.code = code;
    }

    if (charge) {
      data.charge = parseInt(charge);
    }

    if (info && typeof info === "object") {
      data.info = info;
    }

    if (time) {
      data.time = parseInt(time);
    }

    if (form_id) {
      data.form_id = form_id;
    }

    if (nano_pic) {
      if (investigation.nano_pic) {
        const relax = await UpdatePic({
          id: investigation.nano_pic,
          table: "investigation",
          base64: nano_pic,
        });
        data.nano_pic = relax?.id || investigation.nano_pic;
      } else {
        const relax = await AddPic({
          base64: nano_pic,
          table: "patient",
        });
        data.nano_pic = relax?.id || investigation.nano_pic;
      }
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updateInvestigation = await prisma.investigation.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updateInvestigation,
      server_message: "Updated investigation",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
