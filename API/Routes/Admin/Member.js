const router = require("express").Router();

const {
  Add,
  ById,
  Edit,
  Delete_Member,
  List,
  Media,
} = require("./../../Controller/Admin/Member");


router.get("", ById);
router.post("", Add);
router.put("", Edit);
router.delete("", Delete_Member);

router.get("/list", List);
router.get("/media", Media);

module.exports = router;
