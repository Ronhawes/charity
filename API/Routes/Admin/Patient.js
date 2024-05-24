const router = require("express").Router();

const {
  Allergie,
  Kin,
  Add,
  Edit,
  DeletePatient,
  ById,
  List,
  Media,
  Search,
} = require("./../../Controller/Admin/Patient");

router.get("", ById);
router.post("", Add);
router.put("", Edit);
router.delete("", DeletePatient);

router.get("/list", List);
router.get("/media", Media);
router.get("/search", Search);

router.post("/allergie", Allergie.Add);
router.put("/allergie", Allergie.Edit);
router.delete("/allergie", Allergie.DeleteAllergie);

router.post("/kin", Kin.Add);
router.put("/kin", Kin.Edit);
router.delete("/kin", Kin.DeleteKin);

module.exports = router;
