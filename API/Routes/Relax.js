const router = require("express").Router();

const multerSave = require("./../Utils/multerSave");

const { createDb, dbExisits, insertRecord } = require("./../Relax/Test/Utils");

const {
  AddDocument,
  ReadDocument,
  DeleteDocument,
  EditDocument,
} = require("./../Relax/Test/Document");

const {
  readPic,
  addPic,
  deletePic,
  updatepic,
} = require("./../Relax/Test/Pic");

router.get("/create-db", createDb);
router.get("/db-exists", dbExisits);
router.post("/insert-record", insertRecord);

router.get("/read-pic", readPic);
router.post("/add-pic", addPic);
router.delete("/delete-pic", deletePic);
router.put("/update-pic", updatepic);

router.post("/add-document", multerSave, AddDocument);
router.get("/read-document", ReadDocument);
router.put("/edit-document", multerSave, EditDocument);
router.delete("/delete-document", DeleteDocument);

module.exports = router;
module.exports = router;
