const express = require("express");
const basicAuth = require("../middlewares/basic.auth");
const { getIps } = require("../services/admin.service");
const router = express.Router();

router.get("/Ips",basicAuth, async (req,res)=>{
    const result = await getIps();
    res.send(result)
})

module.exports = router;
