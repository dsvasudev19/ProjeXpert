const router=require("express").Router()

const authRoutes=require("./admin/authRoutes")
router.use("/auth",authRoutes)

const bugRoutes=require("./admin/bugRoutes")
router.use("/bug",bugRoutes)

const clientRoutes=require("./admin/clientRoutes")
router.use("/client",clientRoutes)

const paymentRoutes=require("./admin/paymentRoutes")
router.use("/payment",paymentRoutes)

const permissionRoutes=require("./admin/permissionRoutes")
router.use("/permission",permissionRoutes)

const projectRoutes=require("./admin/projectRoutes")
router.use("/project",projectRoutes)

const roleRoutes=require("./admin/roleRoutes")
router.use("/role",roleRoutes)

module.exports=router;