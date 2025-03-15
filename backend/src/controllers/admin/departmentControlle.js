const {Department}=require("./../../models")
const {Op}=require("sequelize")
// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = await Department.create({ name, description });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all departments (with optional search filter)
exports.getAllDepartments = async (req, res) => {
  try {
    const search = req.query.search || "";
    const departments = await Department.findAll({
      where: { name: { [Op.like]: `%${search}%` } }
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    await department.update({ name, description });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });

    await department.destroy();
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get departments with the highest number of projects
// TODO : need to work more on this particular structure with department and project associations
// exports.getTopDepartments = async (req, res) => {
//   try {
//     const departments = await Department.findAll({
//       include: [{ model: Project, as: "projects" }],
//       order: [[{ model: Project, as: "projects" }, "id", "DESC"]],
//       limit: 5
//     });
//     res.json(departments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
