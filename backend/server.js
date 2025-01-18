require("dotenv").config()
const express = require("express")
const { sequelize,PersonalTodo } = require("./src/models")
const PORT = process.env.PORT || 3000
const cors=require("cors")
const path=require("path")
const adminRoutes=require("./src/routes/adminRoutes")
const routes=require("./src/routes")
const cookieParser = require('cookie-parser');

const app = express()


var corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4200",
        "https://projexpert.vercel.app",
        "*"

    ],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization,Set-Cookie",
};
app.use(express.static("./uploads"));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/v1", routes);

app.use("/api/v1/admin", adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: { code: statusCode, message: "Something went wrong!", err },
    });
});


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/status", (req, res) => {
    res.send("Hey Mr., I'm fine...Just chill and Relaxxxxxxxxx.")
})



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    })
})




