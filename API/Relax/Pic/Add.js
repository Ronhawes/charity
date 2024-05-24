const insertRecord = require("./../Utils/insertRecord");
async function Add({ base64 = null, table = "" }) {
  try {
    if (!base64 || typeof base64 !== "string") {
      return false;
    }
    let doc = {
      pic: base64,
    };

    if (typeof table === "string") {
      doc.table = table;
    }

    //{}

    let record = await insertRecord({ doc, dbName: "pics" });

    return record;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = Add;
