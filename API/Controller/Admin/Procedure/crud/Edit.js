const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic, UpdatePic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { name, code, charge, info, time, nano_pic, form_id, id } = req.body;

    if (!id) {
      throw { custom: true, message: "Procedure id is required" };
    }

    const procedure = await prisma.procedure.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!procedure) {
      throw { custom: true, message: "Procedure with id not found" };
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

    if (info) {
      data.info = info;
    }

    if (time) {
      data.time = parseInt(time);
    }

    if (form_id) {
      data.form_id = form_id;
    }

    if (nano_pic) {
      if (procedure.nano_pic) {
        const relax = await UpdatePic({
          id: procedure.nano_pic,
          table: "investigation",
          base64: nano_pic,
        });
        data.nano_pic = relax?.id || procedure.nano_pic;
      } else {
        const relax = await AddPic({
          base64: nano_pic,
          table: "patient",
        });
        data.nano_pic = relax?.id || procedure.nano_pic;
      }
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updateProcedure = await prisma.procedure.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updateProcedure,
      server_message: "Updated investigation",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
