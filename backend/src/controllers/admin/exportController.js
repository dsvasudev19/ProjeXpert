const { User, Project, Task, Bug, Team, TeamMember, Payment, Role } = require('../../models');
const json2csv = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Helper function to clean data for CSV export
const cleanDataForExport = (data) => {
  return data.map(item => {
    const cleanedItem = { ...item.toJSON() };
    delete cleanedItem.password;
    delete cleanedItem.createdAt;
    delete cleanedItem.updatedAt;
    return cleanedItem;
  });
};

const exportData = async (req, res) => {
  try {
    const { type } = req.params;
    const exportDir = path.join(__dirname, '../../../exports');
    if (!fs.existsSync(exportDir)){
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // If type is 'all', create a zip with all exports
    if (type === 'all') {
      const timestamp = Date.now();
      const zipFileName = `all_data_export_${timestamp}.zip`;
      const zipFilePath = path.join(exportDir, zipFileName);
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', { zlib: { level: 9 }});

      output.on('close', () => {
        res.download(zipFilePath, zipFileName, (err) => {
          if (err) {
            res.status(500).send({ message: "Could not download the file." + err });
          }
          fs.unlinkSync(zipFilePath);
        });
      });

      archive.pipe(output);

      // Export all tables
      const tables = {
        users: { model: User, include: [{ model: Role, attributes: ['name'] }] },
        projects: { model: Project, include: [{ model: User, as: 'Client', attributes: ['name'] }] },
        tasks: { model: Task, include: [{ model: User, as: 'Assignee' }, { model: Project }] },
        bugs: { model: Bug, include: [{ model: Project }] },
        teams: { model: Team, include: [{ model: User, as: 'Lead' }] },
        teamMembers: { model: TeamMember, include: [{ model: User }] },
        payments: { model: Payment, include: [{ model: Project }] }
      };

      for (const [tableName, config] of Object.entries(tables)) {
        const data = await config.model.findAll({
          include: config.include
        });
        const cleanedData = cleanDataForExport(data);
        const fields = Object.keys(cleanedData[0] || {});
        const json2csvParser = new json2csv({ fields });
        const csv = json2csvParser.parse(cleanedData);
        archive.append(csv, { name: `${tableName}.csv` });
      }

      archive.finalize();
      return;
    }

    // Handle single table export
    let data;
    let fields;
    let includeConfig;

    switch (type) {
      case 'users':
        includeConfig = [{ model: Role, attributes: ['name'] }];
        fields = ['id', 'name', 'email', 'status', 'userType'];
        break;

      case 'projects':
        includeConfig = [{ model: User, as: 'Client', attributes: ['name'] }];
        fields = ['id', 'title', 'description', 'status', 'startDate', 'endDate', 'budget'];
        break;

      case 'tasks':
        includeConfig = [
          { model: User, as: 'Assignee' },
          { model: Project }
        ];
        fields = ['id', 'title', 'description', 'status', 'priority', 'dueDate', 'progress'];
        break;

      case 'bugs':
        includeConfig = [{ model: Project }];
        fields = ['id', 'title', 'description', 'status', 'priority', 'reportedDate'];
        break;

      case 'teams':
        includeConfig = [{ model: User, as: 'Lead' }];
        fields = ['id', 'name', 'description', 'status'];
        break;

      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    data = await eval(type.charAt(0).toUpperCase() + type.slice(1)).findAll({
      include: includeConfig
    });

    const cleanedData = cleanDataForExport(data);
    const json2csvParser = new json2csv({ fields });
    const csv = json2csvParser.parse(cleanedData);

    const fileName = `${type}_export_${Date.now()}.csv`;
    const filePath = path.join(exportDir, fileName);

    fs.writeFileSync(filePath, csv);

    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      message: 'Error exporting data', 
      error: error.message 
    });
  }
};

module.exports = {
  exportData
}; 