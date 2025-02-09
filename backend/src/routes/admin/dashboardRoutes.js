const router=require("express").Router();
const controller=require("./../../controllers/admin/dashboardController")
const {authenticateUser}=require("./../../middlewares/authenticate")
router.get("/side-data",authenticateUser,controller.getDashboardData)

router.get("/overview",authenticateUser,controller.getDashboardOverview)

module.exports=router;