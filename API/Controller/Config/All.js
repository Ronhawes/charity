const prisma = require("./../../Prisma");

const Auto = require("./Auto");

async function AllConf(req, res, next) {
  try {
    let conf = await Auto();

    if (conf === "error") {
      throw { custom: true, message: "Configuration error" };
    }

    return res.status(200).json({ message: "Configuration Completed" });
  } catch (e) {
    next(e);
  }
}

module.exports = AllConf;
