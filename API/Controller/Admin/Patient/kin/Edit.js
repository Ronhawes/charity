const { validEmail, validPhone } = require("../../../../Utils/validations");

const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const {
      id,
      name,
      phone,
      email,
      address,
      is_primary,
      relationship_id,
      gender_id,
    } = req.body;

    if (!id) {
      throw { custom: true, message: "Id is required" };
    }

    const kin = await prisma.patient_kin.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!kin) {
      throw { custom: true, message: "Next of kin not found" };
    }

    const data = {};

    if (name) {
      data.name = name;
    }

    if (phone) {
      if (!validPhone(phone)) {
        throw { custom: true, message: "Enter a valid phone number" };
      }
      data.phone = phone;
    }

    if (email) {
      if (!validEmail(email)) {
        throw { custom: true, message: "Enter a valid email address" };
      }
      data.email = email;
    }

    if (address) {
      data.address = address;
    }

    if (typeof is_primary === "boolean") {
      data.is_primary = is_primary;
    }

    if (relationship_id) {
      data.relationship_id = parseInt(relationship_id);
    }

    if (gender_id) {
      data.gender_id = parseInt(gender_id);
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updateKin = await prisma.patient_kin.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updateKin,
      server_message: "Next of kin updated",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
