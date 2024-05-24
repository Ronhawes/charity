const router = require("express").Router();

const {
  Add,
  ById,
  Edit,
  DeleteInvestigation,
  List,
  Media,
  Space,
} = require("./../../Controller/Admin/Investigation");

router.post("", Add);
router.get("", ById);
router.put("", Edit);
router.delete("", DeleteInvestigation);

router.get("/list", List);

router.get("/media", Media);

router.get("/space/multi-space", Space.MultiGet);
router.put("/space/multi-space", Space.MultiEdit);

router.post("/space", Space.Add);
router.delete("/space", Space.Delete);

module.exports = router;
