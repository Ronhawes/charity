const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic, UpdatePic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const {
      id,
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

    if (!id) {
      throw { custom: true, message: "Patient id is required" };
    }

    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!patient) {
      throw { custom: true, message: "Patient with id not found" };
    }

    const data = {};

    if (first_name) {
      data.first_name = first_name;
    }

    if (second_name) {
      data.second_name = second_name;
    }

    if (sir_name) {
      data.sir_name = sir_name;
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
      if (patient && parseInt(patient.id) !== parseInt(id)) {
        throw { custom: true, message: `Patient with email ${email} exists` };
      }
      data.email = email;
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

      if (patient && parseInt(patient.id) !== parseInt(id)) {
        throw { custom: true, message: `Patient with phone ${phone} exists` };
      }
      data.phone = phone;
    }

    if (nationality) {
      data.nationality = nationality;
    }

    if (occupation) {
      data.occupation = occupation;
    }

    if (district) {
      data.district = district;
    }

    if (ward) {
      data.ward = ward;
    }

    if (dob) {
      data.dob = dob;
    }

    if (gender_id) {
      data.gender_id = parseInt(gender_id);
    }

    if (religion_id) {
      data.religion_id = parseInt(religion_id);
    }

    if (nano_pic) {
      if (patient.nano_pic) {
        let newPic = await UpdatePic({
          id: parent.nano_pic,
          table: "patient",
          base64: nano_pic,
        });
        data.nano_pic = newPic?.id || patient.nano_pic;
      } else {
        const relax = await AddPic({
          base64: nano_pic,
          table: "patient",
        });
        data.nano_pic = relax?.id || patient.nano_pic;
      }
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const upatedPatient = await prisma.patient.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...upatedPatient,
      server_message: `Patient ${patient.first_name} updated successfully`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
