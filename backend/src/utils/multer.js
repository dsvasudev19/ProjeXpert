// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const process = require("process");
// const crypto = require("crypto"); // Added missing import for crypto
// const cwd = process.cwd();

// if (!fs.existsSync("uploads/")) {
//   fs.mkdirSync("uploads/");
//   console.log(fs.existsSync("uploads/"));
// }

// const createDirIfNot = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
// };
// const pwd = cwd.replace(/\\/g, "/");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueString =
//       Date.now() + "_" + crypto.randomBytes(5).toString("hex");
//     cb(null, uniqueString);
//   },
// });

// const projectFile = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads/projectFile";
//     createDirIfNot(dir);
//     cb(null, dir); // Changed to use the variable dir instead of hardcoded path
//   },
//   filename: (req, file, cb) => {
//     const uniqueString = Date.now() + "_" + path.extname(file.originalname);
//     cb(null, "project_" + uniqueString);
//   },
// });

// const taskFile = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads/taskFile";
//     createDirIfNot(dir);
//     cb(null, dir); // Changed to use the variable dir instead of hardcoded path
//   },
//   filename: (req, file, cb) => {
//     const uniqueString = Date.now() + "_" + path.extname(file.originalname);
//     cb(null, "task_" + uniqueString);
//   }
// });

// function fileFilter(req, file, cb) {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong file type"));
//   }
// }

// const upload = multer({ storage, fileFilter });

// const projectUpload = multer({
//   storage: projectFile,
//   limits: { fileSize: 1024 * 1024 * 2 },
// });

// const taskUpload = multer({
//   storage: taskFile,
//   limits: { fileSize: 1024 * 1024 * 2 },
// });

// module.exports = {
//   upload,
//   taskUpload,
//   projectUpload
// };


// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const process = require("process");
const crypto = require("crypto");

const cwd = process.cwd();

if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/");
  console.log(fs.existsSync("uploads/"));
}

const createDirIfNot = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
const pwd = cwd.replace(/\\/g, "/");

// Generic upload (for backward compatibility)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + crypto.randomBytes(5).toString("hex");
    cb(null, uniqueString);
  },
});

// Project file upload
const projectFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/projectFile";
    createDirIfNot(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "project_" + uniqueString);
  },
});

// Task file upload
const taskFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/taskFile";
    createDirIfNot(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "task_" + uniqueString);
  },
});

// Ticket attachment upload
const ticketFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/ticketFile";
    createDirIfNot(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "ticket_" + uniqueString);
  },
});

// File filter for images (optional, can be adjusted based on ticket requirements)
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type"));
  }
}

// Multer instances
const upload = multer({ storage, fileFilter });
const projectUpload = multer({
  storage: projectFile,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB limit
});
const taskUpload = multer({
  storage: taskFile,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB limit
});
const ticketUpload = multer({
  storage: ticketFile,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit for tickets (adjustable)
  // Removed fileFilter to allow various file types for tickets
});

module.exports = {
  upload,
  taskUpload,
  projectUpload,
  ticketUpload,
};
