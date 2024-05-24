const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

const bcrypt = require("bcrypt");

async function Add(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      nano_signature,
      nano_pic,
      bio,
      use_remote,
      role_id,
      gender_id,
      staff_title_id,
      staff_type_id,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !role_id ||
      !gender_id ||
      !staff_title_id ||
      !staff_type_id ||
      !password
    ) {
      throw { custom: true, message: "Required fields missing" };
    }

    if (name.length < 4) {
      throw { custom: true, message: "Name too short" };
    }

    if (!validEmail(email)) {
      throw { custom: true, message: "Enter a valid email" };
    }

    if (!validPhone(phone)) {
      throw {
        custom: true,
        message: "Enter a valid phone number",
      };
    }

    if (password.length < 4) {
      throw { custom: true, message: "Password too short" };
    }

    const pass = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      phone,
      bio: bio || false,
      use_remote: use_remote || false,
      role_id: parseInt(role_id),
      gender_id: parseInt(gender_id),
      staff_title_id: parseInt(staff_title_id),
      staff_type_id: parseInt(staff_type_id),
      password: pass,
    };

    if (nano_signature) {
      let relax = await AddPic({
        base64: nano_signature,
        table: "member",
      });
      //console.log(relax);
      data.nano_signature = relax?.id || null;
    }

    if (nano_pic) {
      let relax = await AddPic({
        base64: nano_pic,
        table: "member",
      });

      data.nano_pic = relax?.id || null;
    }

    const member = await prisma.member.create({
      data: data,
    });

    return res.status(201).json({
      ...member,
      server_message: `Member ${name} created`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
