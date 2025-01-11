const multer = require("multer");
const path = require("path");
const fs = require("fs");
const process = require("process");
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueString =
      Date.now() + "_" + crypto.randomBytes(5).toString("hex");
    cb(null, uniqueString);
  },
});

const projectFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/projectFile";
    createDirIfNot(dir);
    cb(null, "./uploads/projectFile");
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "project_" + uniqueString);
  },
});


const taskFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir="./uploads/taskFile";
        createDirIfNot(dir);
        cb(null,"./uploads/taskFile");
    },
    filename:(req,file,cb)=>{
        const uniqueString=Date.now()+"_"+path.extname(file.originalname);
        cb(null,"task_"+uniqueString);
    }
})


function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Wrong file type"));
  }
}

const upload = multer({ storage, fileFilter });

const projectUpload = multer({
  storage: projectFile,
  limits: { fileSize: 1024 * 1024 * 2 },
});

const taskUpload=multer({
    storage:taskFile,
    limits:{fileSize:1024*1024*2},
})

module.exports = {
  upload,
  taskUpload,
  projectUpload
};
