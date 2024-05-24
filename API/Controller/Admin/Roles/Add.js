const prisma = require("./../../../Prisma");

async function Add(req, res, next) {
  try {
    const { name, screens, forms, tables, analytics, cards, description } =
      req.body;

    if (!name || !screens) {
      throw { custom: true, message: "Required details missing" };
    }

    if (typeof name !== "string") {
      throw { custom: true, message: "Name must be a string" };
    }

    let role_exists = await prisma.role.findUnique({
      where: {
        name: name.toLowerCase().trim(),
      },
    });

    if (role_exists) {
      throw { custom: true, message: `!! Role with name ${name} exists` };
    }

    const role = await prisma.role.create({
      data: {
        name: name.toLowerCase().trim(),
        screens: screens || [],
        forms: forms || [],
        tables: tables || [],
        analytics: analytics || [],
        cards: cards || [],
        description: description || "",
      },
    });

    return res.status(201).json({
      ...role,
      server_message: [`Role ${name} created`, "Add Another role"],
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
