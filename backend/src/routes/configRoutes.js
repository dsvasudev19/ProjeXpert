const express=require("express")
const router=express.Router()

const emailConfigRoutes=require("./admin/emailConfigRoutes")
router.use("/email",emailConfigRoutes)

const databaseConfigRoutes=require("./admin/databaseConfigRoutes")
router.use("/database",databaseConfigRoutes)

const generalConfigRoutes=require("./../services/configService")
router.use("/general",generalConfigRoutes)

const integrationsConfigRoutes=require("./../services/integrationsConfigService")
router.use("/integrations",integrationsConfigRoutes)

module.exports=router;