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

const fileRoutes=require("./admin/fileRoutes")
router.use("/file",fileRoutes)

const taskRoutes=require("./admin/taskRoutes")
router.use("/task",taskRoutes)

const todoRoutes=require("./admin/personalTodoRoutes")
router.use("/todo",todoRoutes)

const dashboardRoutes=require("./admin/dashboardRoutes")
router.use("/dashboard",dashboardRoutes)

const teamRoutes=require("./admin/teamRoutes")
router.use("/team",teamRoutes)

const projectAssignment=require("./admin/projectAssignmentRoutes")
router.use("/project-assignment",projectAssignment)

module.exports=router;