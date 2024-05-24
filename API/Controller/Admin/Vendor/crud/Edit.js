const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic, UpdatePic } = require("../../../../Relax/Pic");
const prisma = require("../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const {
      id,
      company_name,
      company_phone,
      company_email,
      bio,
      address,
      contact_people,
      payment_datails,
      nano_pic,
    } = req.body;

    if (!id) {
      throw { custom: true, message: "Vendor id is required" };
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!vendor) {
      throw { custom: true, message: "Vendor not found" };
    }

    const data = {};

    if (company_name) {
      data.company_name = company_name;
    }

    if (company_phone) {
      if (!validPhone(company_phone)) {
        throw { custom: true, message: "Enter a valid phone number" };
      }
      data.company_phone = company_phone;
    }

    if (company_email) {
      if (!validEmail(company_email)) {
        throw { custom: true, message: "Enter a valid email address" };
      }
      data.company_email = company_email;
    }

    if (bio) {
      data.bio = bio;
    }

    if (address) {
      data.address = address;
    }

    if (contact_people && Array.isArray(contact_people)) {
      data.contact_people = contact_people;
    }

    if (payment_datails && Array.isArray(payment_datails)) {
      data.payment_datails = payment_datails;
    }

    if (nano_pic) {
      if (vendor.nano_pic) {
        const relax = await UpdatePic({
          id: vendor.nano_pic,
          table: "vendor",
          base64: nano_pic,
        });
        data.nano_pic = relax?.id || vendor.nano_pic;
      } else {
        const relax = await AddPic({
          base64: nano_pic,
          table: "vendor",
        });
        data.nano_pic = relax?.id || vendor.nano_pic;
      }
    }
    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updateVendor = await prisma.vendor.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updateVendor,
      server_message: "Updated vendor",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
