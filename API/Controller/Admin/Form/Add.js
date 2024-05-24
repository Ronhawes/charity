const prisma = require("../../../Prisma");

async function Add(req, res, next) {
  try {
    const { name, description, color_code, content, form_type_id } = req.body;

    if (!name || !form_type_id || !content) {
      throw { custom: true, message: "Required fields missing" };
    }

    const data = {
      name,
      description: description || null,
      color_code: color_code || null,
      form_type_id: parseInt(form_type_id),
      content: content || [],
    };

    const form = await prisma.form.create({ data });

    return res.status(200).json({ ...form, server_message: "Form created" });
  } catch (e) {
    next();
  }
}

module.exports = Add;
