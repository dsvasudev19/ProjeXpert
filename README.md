

# ProjeXpert

ProjExpert is a full-stack application with a backend built using **Node.js**, **Sequelize ORM**, and **JWT authentication**, and a frontend developed using **React.js**. The application is designed to manage projects, users, and roles, with a focus on efficient role-based access control, project management, and bug tracking.

## Project Structure

The repository contains two main folders:
1. **`backend/`** - This is where the server-side (Node.js) code resides. It includes API endpoints for user authentication, role-based access control, project management, and more.
2. **`projexpert/`** - This folder contains the **React.js** frontend that interacts with the backend to provide a smooth user experience for managing projects, users, and bugs.

### Backend (Node.js + Sequelize)
- Built with **Node.js** and **Sequelize** ORM for managing database models.
- **JWT Authentication** for secure login and session management.
- **Role-based access control**: Users can have multiple roles, and access to resources is based on the user's role.
- Project management with the ability to create, read, update, and delete projects.
- **Bug Tracking** for associating bugs with projects.

### Frontend (React.js)
- Developed with **React.js**.
- Handles user authentication, project listing, and interaction with backend APIs.
- Designed for easy navigation through various project-related tasks and roles.

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/projexpert.git
   cd projexpert/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend/` folder and set the necessary environment variables, such as:
   ```
   JWT_SECRET=your-jwt-secret-key
   DATABASE_URL=your-database-url
   ```

4. Run the backend server:
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:3000` (or whichever port you configure).

### Frontend (React.js)

1. Navigate to the frontend folder:
   ```bash
   cd projexpert
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:5173`.

## Features

- **User Registration and Login**: Allows users to register and log in with their email and password. Passwords are securely hashed and stored.
- **Role Management**: Users are assigned roles like `admin`, `client`, etc., and can have multiple roles. Access to resources is controlled based on user roles.
- **Project Management**: Users can create, view, update, and delete projects.
- **Bug Tracking**: Users can associate bugs with specific projects and track their status.
- **JWT Authentication**: Secure login with token-based authentication. The backend protects sensitive endpoints by verifying the JWT token in the request.

## API Documentation

The backend API follows REST principles. Below are some of the key routes:

### Authentication
- `POST /auth/register`: Registers a new user (default role: `client`).
- `POST /auth/login`: Logs in a user and returns a JWT token.
- `POST /auth/logout`: Logs out a user (client-side logout by removing the token).

### Project Management
- `GET /projects`: Fetches all projects with associated users and bugs.
- `GET /projects/:id`: Fetches a specific project by ID.
- `POST /projects`: Creates a new project.
- `PUT /projects/:id`: Updates an existing project.

### User Management
- `GET /users`: Fetches all users.
- `GET /users/:id`: Fetches a specific user.
- `POST /users`: Creates a new user.
- `PUT /users/:id`: Updates an existing user.

### Bug Management
- `GET /projects/:id/bugs`: Fetches bugs for a specific project.
- `POST /projects/:id/bugs`: Creates a new bug for a specific project.

## Technologies Used

- **Backend**:
  - Node.js
  - Sequelize ORM
  - JWT Authentication
  - Express.js
  - PostgreSQL (or any other database of your choice)

- **Frontend**:
  - React.js
  - Axios (for API calls)
  - React Router
  - Styled-components (or any other CSS framework of your choice)

## Running Tests

To run tests for the backend, you can use:

```bash
npm test
```

Make sure to write and organize unit tests for all the features implemented.

## Contributing

We welcome contributions to this project! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to your branch (`git push origin feature/your-feature-name`)
6. Create a pull request.

Please ensure your changes are well-tested and documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


## Contact Us

We are here to help! If you have any questions or need support, feel free to contact us via **Email** or **WhatsApp**:

### Contact via Email:
You can reach out to us by sending an email to:
**vasudevds1729@gmail.com**

### Contact via WhatsApp:
You can message us directly on WhatsApp at:
**+91 8328203617**

