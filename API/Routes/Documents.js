const router = require("express").Router();

const { download } = require("./../Controller/Documents");

router.get("/download", download);

module.exports = router;
