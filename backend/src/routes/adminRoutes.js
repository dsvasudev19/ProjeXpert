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

const exportRoutes = require('./admin/exportRoutes')
router.use('/export', exportRoutes)

const clientFeedbackRoutes=require("./admin/clientFeedbackRoutes")
router.use("/client-feedback",clientFeedbackRoutes)

const geminiRoutes=require("./admin/geminiRoutes")
router.use("/ai",geminiRoutes)

const projectDashboardRoutes=require("./admin/projectDashboardRoutes")
router.use("/project-dashboard",projectDashboardRoutes)

const timelineRoutes=require("./admin/timelineRoutes")
router.use("/timeline",timelineRoutes)

const departmentRoutes=require("./admin/departmentRoutes")
router.use("/department",departmentRoutes)

const timeEntryRoutes=require("./admin/timeentryRoutes")
router.use("/timers",timeEntryRoutes)


const kanbanRoutes=require("./admin/kanbanRoutes")
router.use("/kanban",kanbanRoutes)

const ticketingRoutes=require("./admin/ticketRoutes")
router.use("/ticket",ticketingRoutes)

module.exports=router; 