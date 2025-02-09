const router=require("express").Router()

const seedRoutes=require("./seed")
router.use("/seed",seedRoutes)

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

const personalTodoRoutes=require("./personalTodoRoutes")
router.use("/todo",personalTodoRoutes)


const chatRoutes=require("./chatRoutes")
router.use("/rooms",chatRoutes)

const configRoutes=require("./configRoutes")
router.use("/config",configRoutes)

module.exports=router;
