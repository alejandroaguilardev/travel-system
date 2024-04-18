# Pet Travel Perú
![Pet Travel Perú Logo](https://pettravelperu.com/storage/3oI8cZmcGuWB969fhdFOoH4ysCIVEKZejFTpTSka.png)

**More than 10 years traveling happy pets**

At *Pet Travel Perú*, we are a team of professionals and veterinarians committed to your peace of mind and satisfaction. Since 2008, we have been helping to mobilize over ten thousand pets worldwide, to destinations such as the United States, European Union, Asia, Africa, and all of Latin America.

---

# Features

# Project Overview

This project represents an API system built with the following technologies:

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

- **TypeScript**: A superset of JavaScript that adds static types to the language, providing an improved developer experience and code quality.

- **MongoDB**: A NoSQL database used for storing and managing data in a flexible, scalable, and JSON-like format.

- **Mongoose**: Mongoose is a MongoDB object modeling library for Node.js. It provides a straightforward schema-based solution to model your application data and includes built-in type casting, validation, query building, and more.

- **JWT (JSON Web Tokens)**: JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for authentication and information exchange. In the context of this API, JWT might be utilized for secure user authentication.

- **UUID (Universally Unique Identifier)**: UUIDs are standardized 128-bit unique identifiers. They can be used as a unique identifier for records in the database or for generating tokens.

- **CRONJOB** In NestJS, you can schedule cron tasks using the @nestjs/schedule module. It allows you to define and execute scheduled tasks in your application using cron expressions. This is useful for automating recurring processes such as database cleanup, scheduled email sending, etc.


- **RECAPTCHA V3** Google reCAPTCHA V3 is a service that helps protect websites from spam and abuse. Unlike previous versions, it relies on risk analysis to determine if a request is from a human or a bot. It provides a risk score for each request, allowing you to make decisions based on this score, such as allowing access, showing a CAPTCHA challenge, or blocking the request. This is useful for protecting forms, user registrations, comments, and other areas from malicious or unwanted activities.

## Best Practices and Patterns

The project follows industry best practices and design patterns, including:

- **Value Object**: Utilizing the Value Object pattern to represent immutable values ensuring data integrity.
- **Hexagonal Architecture**: Structuring the application with a hexagonal architecture for better separation of concerns.
- **Repository Pattern**: Implementing the repository pattern for a clean and organized data access layer.
- **SOLID Principles**: Adhering to SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) for better maintainability and extensibility.
- **Criteria Pattern**: Applying the Criteria pattern for flexible filtering and querying of data.

## Testing

The project is developed following the Test-Driven Development (TDD) approach, ensuring a robust and reliable codebase. Testing is conducted using:

- **Jest**: A JavaScript testing framework that ensures the reliability of the application through unit tests and end-to-end (E2E) tests.



## Project Structure
![Folders](https://i.ibb.co/fqjsmSJ/folder-struc.png")

## Prerequisites

Before starting the system, make sure to have **Node.js** and **MongoDB** installed in your development environment.

## Configuration

Before running the application, you need to configure some environment variables. Create a `.env` file at the root of the project and set the following variables:

```env
PRODUCTION=false
PORT=5000
DATABASE_URL="mongodb://localhost:27017/database_name"
JWT_SECRET_KEY="JWT_SECRET_KEY"
SALT_ROUNDS=10
```

