const router=require("express").Router()
const geminiController=require("./../../controllers/admin/geminiController")

router.post("/project/readme-generator",geminiController.generateProjectReadme)

router.post("/gen",geminiController.generateResponse);

module.exports=router;