

# Project Management System

## Overview

The **Project Management System** is a sophisticated, microservices-based application designed to enhance organizational productivity through streamlined project management, real-time communication, and secure identity management. This system is split into three distinct services, each leveraging the strengths of its respective technology stack:

1. **Messaging & Communication Service** (Node.js): Handles real-time chat, messaging, video conferencing, and meeting scheduling.
2. **Project Management Service** (Java Spring Boot): Manages projects, tasks, bugs, teams, departments, and related data with robust business logic.
3. **Identity Service** (Keycloak or Custom-Built): Provides authentication, authorization, role-based access control (RBAC), and user management.

This redesign separates concerns to optimize scalability, maintainability, and performance. The Messaging Service excels in real-time interactions, the Project Management Service ensures reliable data handling, and the Identity Service centralizes security. Together, they form a cohesive ecosystem that supports small teams to large enterprises with features like multi-tenancy, file uploads, activity tracking, and personal task management.

---

## Features

### Messaging & Communication Service (Node.js)
- **Real-Time Chat**: Direct messaging between users via chat rooms.
- **Message Attachments**: Upload files within chats.
- **Video Conferencing**: Schedule and join video meetings (WebRTC-ready).
- **Meeting Management**: Organize meetings with participants and agendas.
- **WebSocket Support**: Instant updates for messages and meeting statuses.

### Project Management Service (Java Spring Boot)
- **Project Management**: Create, track, and manage projects with budgets, timelines, and priorities.
- **Bug Tracking**: Report, assign, and resolve project-related bugs.
- **Task Management**: Organize tasks with hierarchical (parent/subtask) structures and progress tracking.
- **Team Collaboration**: Manage departments, teams, and member assignments to projects.
- **File Management**: Upload and associate files with projects, with dynamic URL generation.
- **Payment Tracking**: Record financial transactions linked to projects.
- **Personal Todos**: Allow users to manage individual tasks with reminders.
- **Activity Logging**: Track actions for auditing and compliance.
- **Multi-Tenancy**: Isolate data by organization using `organizationId`.

### Identity Service (Keycloak or Custom-Built)
- **User Management**: Register, authenticate, and manage user profiles.
- **Authentication**: Secure login with access and refresh tokens (JWT).
- **Authorization**: Role-based access control (RBAC) with roles and permissions.
- **Password Recovery**: Generate tokens for password resets.
- **Verification**: Track email and phone verification statuses.
- **Single Sign-On (SSO)**: Optional with Keycloak.

---

## Technology Stack

### Messaging & Communication Service
- **Runtime**: Node.js 18.x
- **Framework**: Express.js
- **ORM**: Sequelize with PostgreSQL
- **Real-Time**: Socket.IO for chat, WebRTC for video
- **Build Tool**: npm

### Project Management Service
- **Language**: Java 17
- **Framework**: Spring Boot 3.x
- **ORM**: Spring Data JPA with Hibernate, MySQL
- **Dependencies**: Lombok, Spring Web
- **Build Tool**: Maven

### Identity Service
- **Option 1: Keycloak**:
  - Open-source IAM solution
  - OAuth2/OpenID Connect
  - Docker deployment
- **Option 2: Custom-Built**:
  - Node.js with Express.js
  - Sequelize with PostgreSQL
  - JWT (`jsonwebtoken`), `bcrypt` for security

### Inter-Service Communication
- **API Gateway**: Spring Cloud Gateway or Node.js proxy
- **Protocol**: REST (synchronous), WebSockets (real-time), Kafka/RabbitMQ (events)
- **Authentication**: JWT validation across services

---

## Architecture

This project adopts a **microservices architecture** with three independent services:

1. **Messaging & Communication Service**:
   - Focuses on real-time features.
   - Uses a separate PostgreSQL database for chat and meeting data.
   - Exposes REST APIs and WebSocket endpoints.

2. **Project Management Service**:
   - Handles core business logic and persistent data.
   - Uses a MySQL database for project-related entities.
   - Exposes RESTful APIs.

3. **Identity Service**:
   - Centralizes user authentication and authorization.
   - Uses its own database (PostgreSQL with custom-built, or Keycloak’s internal DB).
   - Issues JWT tokens validated by other services.

### Inter-Service Integration
- **Authentication Flow**:
  - Clients authenticate via the Identity Service.
  - JWT tokens are sent with requests to other services.
  - Services validate tokens using the Identity Service’s public key or API.
- **Data Sharing**:
  - User details (e.g., name, email) are fetched from the Identity Service via API calls (e.g., `GET /users/:id`).
- **Event-Driven Updates**:
  - Kafka events notify the Messaging Service of new tasks or bugs (e.g., “send a chat message when a bug is assigned”).

### Design Patterns
- **Factory Pattern**: Used in the Project Management Service for entity creation.
- **Single Responsibility Principle**: Each service owns its domain.
- **Separation of Concerns**: Communication, project management, and identity are isolated.

---

## Data Models

### Messaging & Communication Service (Node.js)

#### `ChatRoom`
- **Fields**: `id`, `name`, `participant1Id`, `participant2Id`, `lastMessageAt`.
- **Relationships**: One-to-Many with `Message`.

#### `Message`
- **Fields**: `id`, `chatRoomId`, `senderId`, `content`, `isRead`, `attachment`.
- **Relationships**: Many-to-One with `ChatRoom`.

#### `Meeting`
- **Fields**: `id`, `title`, `description`, `startTime`, `endTime`, `videoUrl`, `organizerId`.
- **Relationships**: Many-to-Many with `User` via `MeetingParticipants`.

#### `MeetingParticipants`
- **Fields**: `id`, `meetingId`, `userId`.
- **Purpose**: Junction table for meeting participants.

### Project Management Service (Java Spring Boot)

#### `Project`
- **Fields**: `id`, `name`, `description`, `status`, `startDate`, `endDate`, `budget`, `priority`, `clientId`.
- **Relationships**:
  - One-to-Many with `Bug`, `Payment`, `Task`, `File`.
  - Many-to-Many with `TeamMember` via `ProjectAssignment`.

#### `Bug`
- **Fields**: `id`, `title`, `description`, `status`, `priority`, `dueDate`, `resolution`, `projectId`, `reporterId`, `assigneeId`.
- **Relationships**: Many-to-One with `Project`.

#### `Task`
- **Fields**: `id`, `refId`, `title`, `description`, `status`, `priority`, `dueDate`, `progress`, `createdBy`, `projectId`, `assigneeId`, `parentTaskId`.
- **Relationships**:
  - Many-to-One with `Project`.
  - Many-to-One with `Task` (parent).
  - One-to-Many with `Task` (subtasks).

#### `Department`
- **Fields**: `id`, `name`, `description`, `managerId`, `organizationId`, `budget`, `status`, `location`, `metadata`.
- **Relationships**: One-to-Many with `Team`.

#### `Team`
- **Fields**: `id`, `name`, `description`, `leadId`, `department`.
- **Relationships**: One-to-Many with `TeamMember`.

#### `TeamMember`
- **Fields**: `id`, `teamId`, `userId`, `position`, `status`, `dateJoined`.
- **Relationships**:
  - Many-to-One with `Team`.
  - Many-to-Many with `Project` via `ProjectAssignment`.

#### `ProjectAssignment`
- **Fields**: `id`, `teamMemberId`, `projectId`, `role`, `assignedDate`.
- **Purpose**: Junction table for team member assignments.

#### `File`
- **Fields**: `id`, `name`, `type`, `size`, `path`, `url`, `uploaderId`, `projectId`.
- **Relationships**: Many-to-One with `Project`.

#### `Payment`
- **Fields**: `id`, `amount`, `status`, `paymentDate`, `paymentMethod`, `transactionId`, `projectId`.
- **Relationships**: Many-to-One with `Project`.

#### `PersonalTodo`
- **Fields**: `id`, `title`, `description`, `status`, `priority`, `dueDate`, `reminder`, `userId`, `repeatInterval`, `repeatUntil`, `labels`.
- **Purpose**: User-specific tasks.

#### `ActivityTracker`
- **Fields**: `id`, `entityType`, `entityId`, `userId`, `details`, `actionType`.
- **Purpose**: Audit logging.

### Identity Service (Keycloak or Custom-Built)

#### Keycloak
- Managed internally: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `RefreshToken`, `ForgotPasswordToken`, `UserVerification`.
- Configured via Keycloak Admin Console.

#### Custom-Built (Node.js)
- **`User`**: `id`, `name`, `email`, `password`, `status`, `lastLogin`, `phone`, `githubId`, `githubUsername`, `avatar`, `userType`.
  - Relationships: Many-to-Many with `Role`, One-to-One with `UserVerification`, One-to-Many with `RefreshToken`, `ForgotPasswordToken`.
- **`Role`**: `id`, `name`, `description`, `isActive`.
  - Relationships: Many-to-Many with `User`, `Permission`.
- **`Permission`**: `id`, `name`, `description`, `resource`, `action`.
  - Relationships: Many-to-Many with `Role`.
- **`UserRole`**: `id`, `userId`, `roleId`.
- **`RolePermission`**: `id`, `roleId`, `permissionId`.
- **`RefreshToken`**: `id`, `token`, `userId`, `expiryDate`.
- **`ForgotPasswordToken`**: `id`, `userId`, `token`, `expiryDate`.
- **`UserVerification`**: `id`, `userId`, `email`, `phone`.

---

## Setup Instructions

### Prerequisites
- **Node.js**: 18.x+
- **Java**: 17+
- **Maven**: 3.8+
- **PostgreSQL**: For Messaging and Identity (custom-built).
- **MySQL**: For Project Management.
- **Docker**: For Keycloak (optional).
- **IDE**: VS Code (Node.js), IntelliJ IDEA (Java).

### Messaging & Communication Service

1. **Clone Repository**:
   ```bash
   git clone <messaging-service-url>
   cd messaging-service
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Database**:
   Create `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=messaging_db
   DB_PORT=5432
   ```

4. **Run Migrations**:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start Service**:
   ```bash
   npm start
   ```
   - REST API: `http://localhost:3001`
   - WebSocket: `ws://localhost:3001`

### Project Management Service

1. **Clone Repository**:
   ```bash
   git clone <project-service-url>
   cd project-service
   ```

2. **Configure Database**:
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/project_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build Project**:
   ```bash
   mvn clean install
   ```

4. **Run Service**:
   ```bash
   mvn spring-boot:run
   ```
   - API: `http://localhost:8080`

### Identity Service

#### Keycloak
1. **Run Keycloak**:
   ```bash
   docker run -p 8081:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest
   ```
2. **Access Admin Console**: `http://localhost:8081`
3. **Configure**:
   - Create a realm (e.g., `project-management`).
   - Add clients for Messaging (`messaging-service`) and Project Management (`project-service`).
   - Define roles (e.g., `admin`, `developer`) and permissions.

#### Custom-Built (Node.js)
1. **Clone Repository**:
   ```bash
   git clone <identity-service-url>
   cd identity-service
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Database**:
   Create `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=identity_db
   DB_PORT=5432
   JWT_SECRET=your-secret-key
   ```
4. **Run Migrations**:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. **Start Service**:
   ```bash
   npm start
   ```
   - API: `http://localhost:3000`

---

## Usage

### Messaging & Communication Service
- **Chat**: Connect via WebSocket (`ws://localhost:3001`) and send messages.
- **Meetings**: Schedule via `POST /meetings` with JWT authentication.

### Project Management Service
- **Create Project**: `POST /api/projects` with client ID and details.
- **Assign Task**: `POST /api/tasks` with project and assignee IDs.

### Identity Service
- **Login**: `POST /login` (custom) or Keycloak’s token endpoint.
- **User Details**: `GET /users/:id` with JWT in `Authorization` header.

---

## Development Guidelines

- **New Features**:
  - Add models/services to the appropriate microservice.
  - Update API Gateway routes.
- **Testing**:
  - Node.js: Mocha/Chai for Messaging Service.
  - Java: JUnit for Project Management Service.
- **Security**:
  - Validate JWTs in every service.
  - Use HTTPS in production.

---

## Future Enhancements

- **API Gateway**: Implement load balancing and rate limiting.
- **Event System**: Integrate Kafka for cross-service notifications.
- **Frontend**: Build a React/Angular UI for all services.
- **Monitoring**: Add Prometheus and Grafana for metrics.

---

## Contributing

1. Fork the repository of the desired service.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Commit changes (`git commit -m "Add XYZ feature"`).
4. Push to the branch (`git push origin feature/xyz`).
5. Open a pull request.

---

## License

MIT License. See `LICENSE` file in each service repository.

---

## Contact

For inquiries, contact `vasudevds1729@gmail.com`.
