const prisma = require("./../../../Prisma");

const conf = require("./conf");

async function init(req, res, next) {
  try {
    const keys = Object.keys(conf);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const documents = conf[key];

      for (let j = 0; j < documents.length; j++) {
        const doc = documents[j];
        const update_doc = { ...doc };

        delete update_doc.id;

        console.log("doc=>", doc);

        const result = await prisma[key].upsert({
          where: {
            id: doc.id,
          },
          update: update_doc,
          create: doc,
        });
        console.log("result=>", result);
      }
    }

    return res
      .status(200)
      .json({ message: "Completed initalization of Assets" });
  } catch (e) {
    next(e);
  }
}

module.exports = init;
