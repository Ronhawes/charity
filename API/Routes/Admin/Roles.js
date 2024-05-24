const router = require("express").Router();

const {
  Add,
  Delete_Role,
  Edit,
  List,
  ById,
} = require("./../../Controller/Admin/Roles");

router.get("", ById);
router.post("", Add);
router.put("", Edit);
router.delete("", Delete_Role);

router.get("/list", List);

module.exports = router;
