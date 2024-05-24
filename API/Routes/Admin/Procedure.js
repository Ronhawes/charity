const router = require("express").Router();

const {
  Add,
  ById,
  Edit,
  DeleteProcedure,
  List,
  Media,
  Space,
  Search,
} = require("./../../Controller/Admin/Procedure");

router.post("", Add);
router.get("", ById);
router.put("", Edit);
router.delete("", DeleteProcedure);

router.get("/list", List);
router.get("/media", Media);
router.get("/search", Search);

router.post("/space", Space.Add);
router.delete("/space", Space.Delete);

module.exports = router;
