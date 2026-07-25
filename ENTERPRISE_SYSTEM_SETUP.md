# Enterprise Employee & Project Management System

A production-grade full-stack application for managing employees, projects, tasks, attendance, and leave with role-based access control.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│              Deployed on Vercel                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ Axios
┌─────────────────────────────────────────────────────────────┐
│                  API GATEWAY (Spring Boot)                   │
│  Deployed on Railway/Render (Port 8080)                      │
│  ├─ Authentication (JWT + Refresh Tokens)                    │
│  ├─ Role-Based Access Control                                │
│  └─ Global Exception Handling                                │
└─────────────────────────────────────────────────────────────┘
                            ↓ JPA/Hibernate
┌─────────────────────────────────────────────────────────────┐
│                   MySQL Database                             │
│           Cloud-hosted (AWS RDS/Planetscale)                 │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Project Structure

### Backend (Spring Boot)
```
enterprise-backend/
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── src/main/
│   ├── java/com/enterprise/
│   │   ├── config/              # Spring Configuration
│   │   │   ├── SecurityConfig.java
│   │   │   ├── WebConfig.java
│   │   │   └── SwaggerConfig.java
│   │   ├── controller/          # REST Controllers (Layer 1)
│   │   │   ├── AuthController.java
│   │   │   ├── EmployeeController.java
│   │   │   ├── DepartmentController.java
│   │   │   ├── ProjectController.java
│   │   │   ├── TaskController.java
│   │   │   ├── AttendanceController.java
│   │   │   ├── LeaveController.java
│   │   │   ├── NotificationController.java
│   │   │   ├── ReportController.java
│   │   │   └── ProfileController.java
│   │   ├── service/             # Business Logic (Layer 2)
│   │   │   ├── AuthService.java
│   │   │   ├── EmployeeService.java
│   │   │   ├── DepartmentService.java
│   │   │   ├── ProjectService.java
│   │   │   ├── TaskService.java
│   │   │   ├── AttendanceService.java
│   │   │   ├── LeaveService.java
│   │   │   ├── NotificationService.java
│   │   │   ├── ReportService.java
│   │   │   ├── EmailService.java
│   │   │   └── FileService.java
│   │   ├── repository/          # Data Access (Layer 3)
│   │   │   ├── EmployeeRepository.java
│   │   │   ├── DepartmentRepository.java
│   │   │   ├── ProjectRepository.java
│   │   │   ├── TaskRepository.java
│   │   │   ├── AttendanceRepository.java
│   │   │   ├── LeaveRepository.java
│   │   │   ├── NotificationRepository.java
│   │   │   └── AuditLogRepository.java
│   │   ├── entity/              # JPA Entities
│   │   │   ├── User.java
│   │   │   ├── Employee.java
│   │   │   ├── Department.java
│   │   │   ├── Project.java
│   │   │   ├── Task.java
│   │   │   ├── Attendance.java
│   │   │   ├── Leave.java
│   │   │   ├── Notification.java
│   │   │   └── AuditLog.java
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── AuthDto.java
│   │   │   ├── EmployeeDto.java
│   │   │   ├── ProjectDto.java
│   │   │   └── ...
│   │   ├── security/            # Security Components
│   │   │   ├── JwtTokenProvider.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── CustomUserDetails.java
│   │   │   └── CustomUserDetailsService.java
│   │   ├── exception/           # Exception Handling
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── BusinessException.java
│   │   │   └── ResourceNotFoundException.java
│   │   ├── util/                # Utility Classes
│   │   │   ├── PaginationUtil.java
│   │   │   ├── ValidationUtil.java
│   │   │   └── DateUtil.java
│   │   └── EnterpriseApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── db/migration/        # Flyway/Liquibase migrations
└── README.md

### Frontend (React + Vite)
```
enterprise-frontend/
├── package.json
├── vite.config.js
├── .env.example
├── Dockerfile
├── .dockerignore
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── api/
│   │   ├── axiosConfig.js
│   │   ├── authApi.js
│   │   ├── employeeApi.js
│   │   ├── projectApi.js
│   │   ├── taskApi.js
│   │   ├── attendanceApi.js
│   │   ├── leaveApi.js
│   │   ├── notificationApi.js
│   │   └── reportApi.js
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── Common/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── SuccessAlert.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── NoData.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── EmailVerification.jsx
│   │   ├── Dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── HRDashboard.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   └── Charts.jsx
│   │   ├── Employee/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeDetail.jsx
│   │   │   └── EmployeeImport.jsx
│   │   ├── Department/
│   │   │   ├── DepartmentList.jsx
│   │   │   ├── DepartmentForm.jsx
│   │   │   └── DepartmentDetail.jsx
│   │   ├── Project/
│   │   │   ├── ProjectList.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── ProjectTimeline.jsx
│   │   ├── Task/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskDetail.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   └── TaskGantt.jsx
│   │   ├── Attendance/
│   │   │   ├── AttendanceList.jsx
│   │   │   ├── AttendanceMarkForm.jsx
│   │   │   ├── AttendanceReport.jsx
│   │   │   └── BiometricIntegration.jsx
│   │   ├── Leave/
│   │   │   ├── LeaveList.jsx
│   │   │   ├── LeaveRequestForm.jsx
│   │   │   ├── LeaveApproval.jsx
│   │   │   └── LeaveBalance.jsx
│   │   ├── Notification/
│   │   │   ├── NotificationPanel.jsx
│   │   │   ├── NotificationList.jsx
│   │   │   └── NotificationSettings.jsx
│   │   ├── Report/
│   │   │   ├── EmployeeReport.jsx
│   │   │   ├── ProjectReport.jsx
│   │   │   ├── AttendanceReport.jsx
│   │   │   └── LeaveReport.jsx
│   │   └── Profile/
│   │       ├── ProfilePage.jsx
│   │       ├── ChangePassword.jsx
│   │       └── ProfileSettings.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── usePagination.js
│   │   └── useForm.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── UnauthorizedPage.jsx
│   │   └── ErrorPage.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── storageService.js
│   │   └── notificationService.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── dateUtils.js
│   │   └── permissions.js
│   └── guards/
│       ├── ProtectedRoute.jsx
│       └── RoleRoute.jsx
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── images/
└── README.md
```

## 🗄️ Database Schema

### Key Tables:
- **users**: Authentication and basic user info
- **employees**: Employee details and profile
- **departments**: Department hierarchy
- **projects**: Project management
- **tasks**: Task tracking and assignment
- **attendance**: Daily attendance records
- **leaves**: Leave requests and approvals
- **notifications**: User notifications
- **audit_logs**: System audit trail
- **permissions**: Role-based permissions
- **files**: File uploads metadata

## 🔐 Security Features

- JWT Authentication with access & refresh tokens
- Role-Based Access Control (RBAC)
- Password hashing with BCrypt
- Email verification
- Password reset functionality
- Audit logging
- CORS configuration
- Rate limiting
- Input validation

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set environment variables
3. Auto-deployment on push to main

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Auto-deployment on push to main

### Database (Cloud MySQL)
- AWS RDS
- Planetscale
- Google Cloud SQL

## 📦 Technology Stack

**Frontend:**
- React 18+ with Vite
- Material-UI (MUI)
- Chart.js for analytics
- Axios for API calls
- Redux/Context API for state management
- React Router for navigation

**Backend:**
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA/Hibernate
- Spring Validation
- Swagger/OpenAPI 3.0
- Lombok for boilerplate reduction
- MapStruct for DTO mapping

**Database:**
- MySQL 8.0+
- Flyway/Liquibase for migrations

**DevOps:**
- Docker & Docker Compose
- Git/GitHub Actions

## 📖 Setup Instructions

See detailed setup guides in:
- `BACKEND_SETUP.md`
- `FRONTEND_SETUP.md`
- `DATABASE_SETUP.md`
- `DEPLOYMENT_GUIDE.md`

## 📝 API Documentation

Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

## 🎯 Features

### User Management
- Login/Registration
- Profile management
- Password reset
- Email verification

### Employee Management
- CRUD operations
- Employee directory
- Bulk import/export
- Employee hierarchy

### Department Management
- Create/Edit departments
- Assign employees to departments
- Department hierarchy
- Reports

### Project Management
- Project creation and tracking
- Team member assignment
- Progress tracking
- Milestone management

### Task Management
- Task creation and assignment
- Status tracking (To Do, In Progress, Done)
- Priority management
- Subtasks
- Comments and attachments

### Attendance Management
- Mark daily attendance
- Biometric integration
- Reports and analytics
- Leave deduction

### Leave Management
- Leave request submission
- Approval workflow
- Leave balance tracking
- Leave calendar

### Notifications
- In-app notifications
- Email notifications
- Notification preferences
- Real-time updates

### Reporting
- Employee reports
- Project reports
- Attendance reports
- Leave reports
- Custom report builder

## 🔍 Code Quality

- SOLID principles compliance
- Clean code practices
- Comprehensive error handling
- Input validation
- Unit and integration tests
- API documentation

## 📄 License

MIT License

## 👥 Support

For issues and questions, please create an issue in the repository.
