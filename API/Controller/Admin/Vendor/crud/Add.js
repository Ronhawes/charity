const { validEmail, validPhone } = require("../../../../Utils/validations");

const { AddPic } = require("../../../../Relax/Pic");

const prisma = require("../../../../Prisma");

async function Vendor(req, res, next) {
  try {
    const {
      company_name,
      company_phone,
      company_email,
      bio,
      address,
      contact_people,
      payment_datails,
      nano_pic,
    } = req.body;

    if (!company_name) {
      throw { custom: true, message: "Company name required" };
    }

    const data = {
      company_name,
      bio: bio || null,
      address: address || null,
    };

    if (company_email) {
      if (!validEmail(company_email)) {
        throw { custom: true, message: "Enter a valid email address" };
      }
      data.company_email = company_email;
    }

    if (company_phone) {
      if (!validPhone(company_phone)) {
        throw { custom: true, message: "Enter a valid phone number" };
      }
      data.company_phone = company_phone;
    }

    if (nano_pic) {
      const relax = await AddPic({
        base64: nano_pic,
        table: "vendor",
      });

      data.nano_pic = relax?.id || null;
    }

    if (Array.isArray(contact_people)) {
      data.contact_people = contact_people;
    }

    if (Array.isArray(payment_datails)) {
      data.payment_datails = payment_datails;
    }

    const vendor = await prisma.vendor.create({
      data,
    });

    return res
      .status(200)
      .json({ ...vendor, server_message: "Vendor created succefully" });
  } catch (e) {
    next(e);
  }
}

module.exports = Vendor;
