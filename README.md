# NoteHub 📝

NoteHub is a full-stack notes management application built using **React, Spring Boot, and MySQL**.

The goal of this project is to build a simple and reliable platform for creating, managing, and organizing notes while learning modern full-stack development.

## Tech Stack

**Backend**
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven

**Frontend**
- React
- Vite
- JavaScript
- Axios

## Features

- Create, read, update, and delete notes (CRUD).
- Request validation using Jakarta Bean Validation.
- DTO-based request and response handling.
- Centralized exception handling.
- Consistent JSON error responses.
- Application logging using SLF4J.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes` | Create a note |
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/{id}` | Get a note by ID |
| PUT | `/api/notes/{id}` | Update a note |
| DELETE | `/api/notes/{id}` | Delete a note |

## Getting Started

### Prerequisites
- Java 21
- Maven
- MySQL
- Node.js and npm

### Backend Setup

1. Clone the repository.
2. Create a MySQL database named `notehub_db`.
3. Configure your database credentials in the Spring Boot configuration.
4. Navigate to the backend directory.
5. Run the application using your IDE or Maven.

### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Project Status

Backend CRUD operations and API hardening are completed. Frontend development and integration are in progress.

## Purpose

This project is being developed as a hands-on learning experience to understand backend development, REST APIs, database integration, and full-stack application development.

---

**Built with ☕ and curiosity.**