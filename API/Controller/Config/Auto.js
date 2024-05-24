const prisma = require("./../../Prisma");

const adminConf = require("./Admin/conf");
const assetConf = require("./Asset/conf");
const outPatientConf = require("./Asset/conf");

async function AutoConfig() {
  try {
    let confs = [adminConf, assetConf, outPatientConf];

    for (let k = 0; k < confs.length; k++) {
      const conf = confs[k];
      let keys = Object.keys(conf);

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

      console.log("Completed config ", k);
    }
  } catch (e) {
    console.log(e);
    return "error";
  }
}

module.exports = AutoConfig;
