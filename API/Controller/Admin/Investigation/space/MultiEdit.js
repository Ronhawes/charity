const prisma = require("../../../../Prisma");

async function multiEdit(req, res, next) {
  try {
    const { id, spaces } = req.body;
    if (!id) {
      throw { custom: true, message: "Investigation id required" };
    }

    if (typeof spaces !== "object" || Array.isArray(spaces)) {
      throw { custom: true, message: "spaces must be an object" };
    }

    const keys = Object.keys(spaces);

    const addedSpaces = [];
    const removedSpace = [];

    for (let key of keys) {
      const space = spaces[key];
      if (space.value) {
        addedSpaces.push({ space_id: parseInt(key), investigation_id: id });
        continue;
      }
      removedSpace.push(key);
    }

    const transObj = await prisma.$transaction(async (tx) => {
      const removed_space = await tx.investigation_space.deleteMany({
        where: {
          investigation_id: parseInt(id),
        },
      });

      const added_space = await tx.investigation_space.createMany({
        data: addedSpaces,
      });

      return { removed_space, added_space };
    });

    return res.status(200).json(transObj);
  } catch (e) {
    next(e);
  }
}

module.exports = multiEdit;
