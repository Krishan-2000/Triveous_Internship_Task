# Triveous_Internship_Task

# E-Commerce Project Setup and Run Guide

Welcome to the E-Commerce Project! This guide will walk you through the process of setting up and running the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) - Download and install Node.js.
- [MongoDB](https://www.mongodb.com/) - Install MongoDB and make sure it's running.

## Getting Started

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-project.git
   cd e-commerce-project

2. Run npm install to install all dependencies.

3. Configure Environment Variables:
   Create a .env file in the project root and set the following environment variables:

   JWT_PRIVATE_KEY="Triveous_jwtPrivateKey"
   PORT=7000
   MONGODB_URL=mongodb://localhost:27017/Triveous

4. Start the server

   Run: npm start

5. Access the Application:

   Open your web browser and navigate to http://localhost:7000.

Project Structure
models/ - Contains Mongoose schema definitions.
routes/ - Defines API routes for different features.
public/ - Static files for the frontend (if applicable).
startup/ - Configuration files and setup scripts.
server.js - Main application entry point.
