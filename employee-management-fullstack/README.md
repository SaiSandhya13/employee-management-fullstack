# Employee Management System — Java Full Stack

A simple full-stack CRUD application built with:

- Java 17
- Spring Boot 3
- Spring Data JPA / Hibernate
- MySQL
- React
- Vite
- Axios
- REST API

## Features

- Add employee
- View employees
- Search employees by name
- Update employee
- Delete employee
- MySQL persistence
- RESTful backend
- React frontend

## Project structure

employee-management-fullstack/
├── backend/
│   ├── pom.xml
│   └── src/
├── frontend/
│   ├── package.json
│   └── src/
└── database/
    └── schema.sql

## 1. Create MySQL database

Run:

CREATE DATABASE employee_db;

Then edit:

backend/src/main/resources/application.properties

Set:

spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

## 2. Run backend

Open terminal:

cd backend
mvn spring-boot:run

Backend:
http://localhost:8080

API:
http://localhost:8080/api/employees

## 3. Run frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:
http://localhost:5173

## 4. Test API

GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}

Example POST body:

{
  "name": "Sai",
  "email": "sai@example.com",
  "department": "IT",
  "salary": 55000
}

## Resume description

Employee Management System | Java, Spring Boot, React, MySQL

Developed a full-stack employee management application using Spring Boot REST APIs, Spring Data JPA, React, and MySQL. Implemented CRUD operations, employee search, validation, RESTful API integration, and a responsive React user interface.
