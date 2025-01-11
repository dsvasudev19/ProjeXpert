const router=require("express").Router()

const clientRoutes=require("./clientRoutes")
router.use("/client",clientRoutes)

const projectRoutes=require("./projectRoutes")
router.use("/project",projectRoutes)

const paymentRoutes=require("./paymentRoutes")
router.use("/payment",paymentRoutes)

const bugRoutes=require("./bugRoutes")
router.use("/bug",bugRoutes)

const authRoutes=require("./authRoutes")
router.use("/auth",authRoutes)

module.exports=router;