const router = require("express").Router();

const {
  Add,
  ById,
  Edit,
  DeleteSpace,
  List,
  Media,
  Member,
} = require("./../../Controller/Admin/Space");

router.post("", Add);
router.get("", ById);
router.put("", Edit);
router.delete("", DeleteSpace);

router.get("/list", List);
router.get("/media", Media);

router.post("/member", Member.Add);
router.delete("/member", Member.DeleteSpaceMember);

module.exports = router;
