const prisma = require("../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { name, description, color_code, content, form_type_id, id } =
      req.body;

    const data = {};

    if (!id) {
      throw { custom: true, message: "Form id required" };
    }

    const form = await prisma.form.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!form) {
      throw { custom: true, message: "Form not found" };
    }

    if (name) {
      data.name = name;
    }

    if (description) {
      data.description = description;
    }

    if (color_code) {
      data.color_code = color_code;
    }

    if (content) {
      data.content = content;
    }

    if (form_type_id) {
      data.form_type_id = form_type_id;
    }

    const updatedForm = await prisma.form.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    return res
      .status(200)
      .json({ ...updatedForm, server_message: "Form updated" });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
