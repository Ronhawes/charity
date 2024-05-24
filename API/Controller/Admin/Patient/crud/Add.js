const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const {
      first_name,
      second_name,
      sir_name,
      email,
      phone,
      nationality,
      occupation,
      district,
      ward,
      dob,
      nano_pic,
      gender_id,
      religion_id,
    } = req.body;

    if (!first_name || !dob || !gender_id || !religion_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    if (email) {
      if (!validEmail(email)) {
        throw { custom: true, message: "Enter a valid email address" };
      }

      const patient = await prisma.patient.findFirst({
        where: {
          email: email,
        },
      });

      if (patient) {
        throw { custom: true, message: `Patient with email ${email} exists` };
      }
    }

    if (phone) {
      if (!validPhone(phone)) {
        throw { custom: true, message: "Enter a valid phone number" };
      }
      const patient = await prisma.patient.findFirst({
        where: {
          phone: phone,
        },
      });

      if (patient) {
        throw { custom: true, message: `Patient with email ${phone} exists` };
      }
    }

    const data = {
      first_name: first_name,
      second_name: second_name || null,
      sir_name: sir_name || null,
      email: email || null,
      phone: phone || null,
      nationality: nationality || null,
      occupation: occupation || null,
      district: district || null,
      ward: ward || null,

      gender_id: parseInt(gender_id),
      religion_id: parseInt(religion_id),
    };

    if (dob) {
      const date = new Date(dob);
      const isoString = date.toISOString();
      data.dob = isoString;
    }

    if (nano_pic) {
      const relax = await AddPic({
        base64: nano_pic,
        table: "patient",
      });

      data.nano_pic = relax?.id || null;
    }

    const patient = await prisma.patient.create({
      data,
    });

    return res.status(201).json({
      ...patient,
      server_message: `Member ${first_name || ""} created`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
