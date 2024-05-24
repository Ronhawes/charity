const router = require("express").Router();

const {
  Add,
  ById,
  DeleteVendor,
  Edit,
  List,
  Attachment,
} = require("./../../Controller/Admin/Vendor");

const multerSave = require("./../../Utils/multerSave");

router.post("", Add);
router.get("", ById);
router.put("", Edit);
router.delete("", DeleteVendor);

router.get("/list", List);

router.post("/attachment", multerSave, Attachment.Add);
router.delete("/attachment", Attachment.Delete);

module.exports = router;
