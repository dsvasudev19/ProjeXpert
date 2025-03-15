const express = require("express");
const router = express.Router();
const departmentController = require("../../controllers/admin/departmentControlle");

// Basic CRUD Routes
router.post("/", departmentController.createDepartment);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

// Extra Feature Routes
// FIXME: fix this later concluding the structure in controller
// router.get("/top/departments", departmentController.getTopDepartments);

module.exports = router;
