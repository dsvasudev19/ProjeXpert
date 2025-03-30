const express=require("express")

const app=express();
const path=require("path")

app.use(express.static(path.join(__dirname,"dist")));

app.use(express.static("public"))


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"dist","index.html"))

})


app.listen(4000,()=>{
    console.log("Server Started listening on 4000")
})



// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Serve static files from React's build directory
// app.use(express.static(path.join(__dirname, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
