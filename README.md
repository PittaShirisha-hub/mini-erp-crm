# Mini ERP + CRM Management System

A full-stack ERP & CRM Management System developed as a Full Stack Developer Case Study Project. The application helps businesses manage customers, products, suppliers, purchases, invoices, payments, and reports through a modern web dashboard.

---

# Live Demo

**Frontend:** https://your-frontend-url.vercel.app

**Backend:** https://your-backend-url.onrender.com

---

# GitHub Repository

https://github.com/your-username/mini-erp-crm

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS
- React Icons

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication

## Database

- PostgreSQL (Neon)

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Dynamic Logged-in User

---

## Dashboard

- Dashboard Overview
- Revenue Summary
- Search Navigation

---

## Customer Management

- Add Customer
- Edit Customer
- Delete Customer
- Search Customer

Customer Fields

- Customer Name
- Business Name
- Email
- Mobile Number
- Address
- GST Number
- Customer Type
- Status

---

## Product Management

- Add Product
- Edit Product
- Delete Product
- Product Inventory

---

## Supplier Management

- Add Supplier
- Edit Supplier
- Delete Supplier

Supplier Fields

- Supplier Name
- Contact Person
- Email
- Phone
- GST Number
- Address
- Status

---

## Purchase Management

- Add Purchase
- View Purchases
- Update Purchase
- Delete Purchase

---

## Invoice Management

- Create Invoice
- Generate Invoice
- Invoice Status
- Invoice Total

---

## Payment Management

- Record Payments
- Payment Status
- Invoice Payment Tracking

---

## Reports

- Revenue Overview
- Dashboard Statistics
- PDF Export

---

# Project Structure

```
mini-erp-crm
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── prisma
│   ├── src
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/mini-erp-crm.git
```

```
cd mini-erp-crm
```

---

# Backend Setup

```
cd server
```

Install packages

```bash
npm install
```

Create a `.env`

```env
DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key

PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Push Database

```bash
npx prisma db push
```

Run Backend

```bash
npm run dev
```

---

# Frontend Setup

```
cd client
```

Install Packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

# Authentication

The application supports secure authentication using JWT.

Users can

- Register
- Login
- Logout

Protected routes require authentication.

---

# API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Customers

```
GET
POST
PUT
DELETE
```

## Products

```
GET
POST
PUT
DELETE
```

## Suppliers

```
GET
POST
PUT
DELETE
```

## Purchases

```
GET
POST
PUT
DELETE
```

## Invoices

```
GET
POST
PUT
DELETE
```

## Payments

```
GET
POST
PUT
DELETE
```

---

# Environment Variables

Backend

```env
DATABASE_URL=

JWT_SECRET=

PORT=
```

---

# Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

---

# Architecture

```
React Frontend

↓

REST API

↓

Node.js + Express

↓

Prisma ORM

↓

PostgreSQL (Neon)
```

---

# Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Environment Variables
- Input Validation

---

# Future Enhancements

- Role-based Authorization (Admin, Sales, Warehouse, Accounts)
- Product Image Upload
- AWS S3 Integration
- Docker Support
- GitHub Actions CI/CD
- Stock Movement Logs
- Advanced Reports

---

# Developed By

**Shirisha Pitta**

B.Tech Computer Science and Engineering(Artificial Intelligence & Machine Learning)

Mini ERP + CRM Full Stack Case Study Project