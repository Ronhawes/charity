const prisma = require("../../../../Prisma");

async function MultiGet(req, res, next) {
  try {
    const { id } = req.query;
    if (!id) {
      throw { custom: true, message: "Investigation id required" };
    }
    let spaces = prisma.space.findMany({
      include: {
        space_type: true,
      },
    });
    let investigation_space = prisma.investigation_space.findMany({
      where: { investigation_id: parseInt(id) },
    });

    const transaction = await prisma.$transaction([
      spaces,
      investigation_space,
    ]);

    spaces = transaction[0];
    investigation_space = transaction[1];

    const allSpaces = {};

    for (let i = 0; i < spaces.length; i++) {
      const space = spaces[i];
      let found = false;

      for (let j = 0; j < investigation_space.length; j++) {
        const inv_space = investigation_space[j];

        if (parseInt(space.id) === parseInt(inv_space.space_id)) {
          allSpaces[space.id] = {
            value: true,
            label: space?.name || "",
            space: space,
          };
          found = true;
          break;
        }
      }
      if (!found) {
        allSpaces[space.id] = {
          value: false,
          label: space?.name || "",
          space: space,
        };
      }
    }

    return res.status(200).json(allSpaces);
  } catch (e) {
    next(e);
  }
}

module.exports = MultiGet;
