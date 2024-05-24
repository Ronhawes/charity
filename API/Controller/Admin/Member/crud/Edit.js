const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic, UpdatePic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const {
      id,
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
      is_active,
      cards,
    } = req.body;

    if (!id) {
      throw { custom: true, message: "Member id is required" };
    }

    const member = await prisma.member.findUnique({
      where: { id: parseInt(id) },
    });

    if (!member) {
      throw { custom: true, message: `Member with id ${id} not found` };
    }

    const data = {};

    if (name) {
      if (name.length < 4) {
        throw { custom: true, message: "Name too short" };
      }
      data.name = name;
    }

    if (email) {
      if (!validEmail(email)) {
        return res
          .status(200)
          .json({ custom: true, message: "Enter a valid email" });
      }
      data.email = email;
    }

    if (phone) {
      if (!validPhone(phone)) {
        return res.status(200).json({
          custom: true,
          message: "Enter a valid phone number",
        });
      }
      data.phone = phone;
    }

    if (bio && typeof bio === "string") {
      data.bio = bio;
    }

    if (role_id) {
      data.role_id = parseInt(role_id);
    }

    if (gender_id) {
      data.gender_id = parseInt(gender_id);
    }

    if (staff_title_id) {
      data.staff_title_id = parseInt(staff_title_id);
    }

    if (staff_type_id) {
      data.staff_type_id = parseInt(staff_type_id);
    }

    if (typeof use_remote === "boolean") {
      data.use_remote = use_remote;
    }

    if (typeof is_active === "boolean") {
      data.is_active = is_active;
    }

    if (nano_signature) {
      if (member.nano_signature) {
        let newSig = await UpdatePic({
          id: member.nano_signature,
          table: "member",
          base64: nano_signature,
        });
        data.nano_signature = newSig?.id || member.nano_signature;
      } else {
        let newSig = await AddPic({
          base64: nano_signature,
          table: "member",
        });
        data.nano_signature = newSig?.id || member.nano_signature;
      }
    }

    if (nano_pic) {
      if (member.nano_pic) {
        let newPic = await UpdatePic({
          id: member.nano_pic,
          table: "member",
          base64: nano_pic,
        });
        data.nano_pic = newPic?.id || member.nano_pic;
      } else {
        let newPic = await AddPic({
          base64: nano_pic,
          table: "member",
        });
        data.nano_pic = newPic?.id || member?.nano_pic || null;
      }
    }


    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updatedMember = await prisma.member.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json(updatedMember);
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
