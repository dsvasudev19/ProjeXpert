require("dotenv").config()
const express = require("express")
const { sequelize,PersonalTodo } = require("./src/models")
const PORT = process.env.PORT || 3000
const cors=require("cors")
const path=require("path")
const adminRoutes=require("./src/routes/adminRoutes")
const routes=require("./src/routes")


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


app.post('/api/todos/bulk', async (req, res) => {
    // Assuming you're using an in-memory array for demonstration
    const incomingTodos = [
        {
       title: 'Refactor User Authentication Logic',
       description: 'Simplify the existing authentication flow for better maintainability.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 1)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'auth']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Implement Dark Mode Feature',
       description: 'Add dark mode toggle for better user experience.',
       status: 'in-progress',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 2)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['frontend', 'UI']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Optimize Database Queries',
       description: 'Identify slow queries and optimize them for faster response times.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 3)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'database']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Update Project Documentation',
       description: 'Ensure all new features are documented.',
       status: 'pending',
       priority: 'low',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 4)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['documentation']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Set Up CI/CD Pipeline',
       description: 'Automate the build, test, and deployment process.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 5)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['devops']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Fix Memory Leak in Application',
       description: 'Investigate and resolve memory leak issues in the application.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 6)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'performance']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Design New Landing Page',
       description: 'Create a modern, responsive landing page for the product.',
       status: 'in-progress',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 7)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['frontend', 'design']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Add Unit Tests for API Endpoints',
       description: 'Ensure all critical API endpoints have unit tests.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 8)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['testing', 'backend']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Integrate Third-Party Payment Gateway',
       description: 'Add support for a new third-party payment gateway.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 9)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'payments']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Improve SEO for the Application',
       description: 'Optimize the website for better search engine rankings.',
       status: 'in-progress',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 10)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['frontend', 'SEO']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Add Role-Based Access Control',
       description: 'Implement RBAC to restrict access to certain features based on roles.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 11)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'security']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Research New Frontend Frameworks',
       description: 'Investigate modern frontend frameworks for potential adoption.',
       status: 'pending',
       priority: 'low',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 12)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['research', 'frontend']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Upgrade Dependencies',
       description: 'Update all project dependencies to their latest versions.',
       status: 'pending',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 13)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['maintenance']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Conduct Code Review for Module X',
       description: 'Review the code for the new module to ensure it meets the quality standards.',
       status: 'in-progress',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 14)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['code review']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Prepare Presentation for Next Sprint',
       description: 'Create a presentation highlighting key achievements and challenges.',
       status: 'pending',
       priority: 'low',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 15)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['presentation']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Implement Email Notifications',
       description: 'Add email notification system for user actions.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 16)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'notifications']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Fix UI Bugs on Mobile View',
       description: 'Resolve layout issues affecting the mobile view.',
       status: 'in-progress',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 17)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['frontend', 'bugs']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Set Up Error Monitoring',
       description: 'Integrate an error monitoring service for better issue tracking.',
       status: 'pending',
       priority: 'high',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 18)),
       userId: 3,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['devops', 'monitoring']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Analyze User Feedback',
       description: 'Review user feedback and compile a report on common issues and requests.',
       status: 'pending',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 19)),
       userId: 1,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['feedback', 'analysis']),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'Integrate New Analytics Tool',
       description: 'Add support for a new analytics tool for better insights.',
       status: 'pending',
       priority: 'medium',
       dueDate: new Date(),
       reminder: new Date(new Date().setDate(new Date().getDate() + 20)),
       userId: 2,
       repeatInterval: 'none',
       repeatUntil: null,
       labels: JSON.stringify(['backend', 'analytics']),
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ];
  
    // Here, you can push incomingTodos to your database
    // For now, we'll just log them to the console
    await PersonalTodo.bulkCreate(incomingTodos)
    // Respond with a success message
    res.status(201).json({ message: 'Todos added successfully!', todos: incomingTodos });
  });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    })
})




