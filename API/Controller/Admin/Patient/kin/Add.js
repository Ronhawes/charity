const { validEmail, validPhone } = require("../../../../Utils/validations");

const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const {
      name,
      phone,
      email,
      address,
      is_primary,
      relationship_id,
      patient_id,
      gender_id,
    } = req.body;

    if (!patient_id) {
      throw { custom: true, message: "Patient id required" };
    }

    if (!name || !relationship_id || !gender_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    if (email) {
      if (!validEmail(email)) {
        throw { custom: true, message: "Enter a valid email address" };
      }
    }

    if (phone) {
      if (!validPhone(phone)) {
        throw { custom: true, message: "Enter a valid phone number" };
      }
    }

    const data = {
      name,
      phone,
      email,
      address: address || null,
      is_primary: is_primary || false,
      relationship_id: parseInt(relationship_id),
      gender_id: parseInt(gender_id),
      patient_id: parseInt(patient_id),
    };

    const kin = await prisma.patient_kin.create({
      data,
    });

    return res
      .status(201)
      .json({ ...kin, server_message: "Patient next of kin added" });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
