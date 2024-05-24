const router = require("express").Router();

const adminInit = require("./../../Controller/Config/Admin/init");

const assetInit = require("./../../Controller/Config/Asset/init");

const outpatient = require("./../../Controller/Config/Outpatient/init");

const allConf = require("./../../Controller/Config/All");

const getAll = require("./../../Controller/Config/getAll");

router.get("/admin", adminInit);
router.get("/asset", assetInit);
router.get("/outpatient", outpatient);
router.get("/all", allConf);

router.get("/", getAll);

module.exports = router;
