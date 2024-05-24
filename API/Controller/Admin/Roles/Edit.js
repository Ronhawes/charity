const prisma = require("./../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { id, name, description, screens, forms, tables, analytics, cards } =
      req.body;

    const data = {};
    if (!id) {
      throw { custom: true, message: "Role id required" };
    }

    if (name && typeof name === "string") {
      data.name = name;
    }

    if (screens && typeof screens === "object") {
      data.screens = screens;
    }

    if (description && typeof description === "string") {
      data.description = description;
    }

    if (screens) {
      data.screens = screens;
    }
    if (forms) {
      data.forms = forms;
    }
    if (tables) {
      data.tables = tables;
    }
    if (analytics) {
      data.analytics = analytics;
    }
    if (cards) {
      data.cards = cards;
    }

    const updated_role = await prisma.role.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });

    return res.status(201).json({
      ...updated_role,
      server_message: `Role ${updated_role?.name || ""} updated`,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
