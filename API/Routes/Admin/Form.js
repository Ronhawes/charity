const router = require("express").Router();

const {
  Add,
  Edit,
  Delete,
  ById,
  List,
} = require("../../Controller/Admin/Form");

router.post("", Add);
router.get("", ById);
router.put("", Edit);
router.delete("", Delete);

router.get("/list", List);

module.exports = router;
