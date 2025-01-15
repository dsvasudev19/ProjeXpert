const router=require("express").Router();
const controller=require("./../../controllers/admin/dashboardController")

router.get("/side-data",controller.getDashboardData)


module.exports=router;