const router=require("express").Router()

const controller=require("./../../controllers/admin/projectAssignmentController")


router.get("/assignees/:id",controller.getAllAssigneeOfProject)

router.post("/:id",controller.assignEmployeeToProject)

module.exports=router;