# NextGen Cars Server

[GitHub Repository](https://github.com/Rayhan108/car-shop-extended-server)

## Overview

This is the backend server for the **Car Shop** platform, a fully functional e-commerce application for searching, filtering, and purchasing cars. The server handles user authentication, car data management, payment integration via **ShurjoPay**, and more. It is built with **TypeScript** for type safety and **Express.js** for robust server-side operations.

---

## Features

- **User Authentication**: Secure authentication using **JWT** (JSON Web Tokens).
- **Car Management**: Manage car listings with **CRUD operations**.
- **ShurjoPay Integration**: Payment gateway for secure online transactions.
- **Error Handling**: Consistent error responses using **HTTP status codes**.
- **Database**: **MongoDB** for storing user and car data.
- **Environment Configuration**: Manage secrets securely with **dotenv**.

---

## Technologies Used

### Core Dependencies
- **Express.js**: Web server framework.
- **MongoDB & Mongoose**: Database and object modeling.
- **ShurjoPay**: Payment gateway integration.
- **bcrypt**: Password hashing for secure storage.
- **JWT**: Token-based authentication.

### Utilities
- **Zod**: Schema validation.
- **http-status**: Consistent HTTP status code usage.
- **cors**: Enable CORS for API security.
- **dotenv**: Manage environment variables.

### Development Tools
- **TypeScript**: Static typing.
- **ESLint & Prettier**: Code quality and formatting.
- **ts-node-dev**: Hot-reloading during development.

---

## Installation

To run the server locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rayhan108/car-shop-extended-server.git
   cd car-shop-extended-server
2. nmp install
3. npm run dev