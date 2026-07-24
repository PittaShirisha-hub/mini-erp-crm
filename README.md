# Mini ERP + CRM Management System

A full-stack ERP & CRM Management System developed as a Full Stack Developer Case Study Project. The application helps businesses manage customers, products, suppliers, purchases, invoices, payments, and reports through a modern web dashboard.

---

# Live Demo

**Frontend:** https://mini-erp-crm-ten.vercel.app/

**Backend:** https://mini-erp-crm-r5pt.onrender.com/

---

# GitHub Repository

https://github.com/PittaShirisha-hub/mini-erp-crm

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
MINI-ERP-CRM/
│
├── client/                        # React + TypeScript + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── server/                        # Node.js + Express + TypeScript Backend
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── README.md
├── LICENSE
├── .gitignore
├── package.json
└── package-lock.json
```

---


## Screenshots

### Login

![Login](docs/Screenshots/login/loginpage.png)

![Login Successful](docs/Screenshots/login/loginpagesuccessful.png)

---

### Register

![Register](docs/Screenshots/register/registerpage1.png)

![Register Successful](docs/Screenshots/register/registerpagesuccessful.png)

---

### Customer Management

![Customer Page](docs/Screenshots/customer/customerpage.png)

![Customer List](docs/Screenshots/customer/customerlist.png)

---

### Product Management

![Product Page](docs/Screenshots/product/productpage1.png)

![Product List](docs/Screenshots/product/productlist.png)

---

### Supplier Management

![Supplier Page](docs/Screenshots/supplier/supplierpage1.png)

---

### Purchase Management

![Purchase Page](docs/Screenshots/purchase/purchasepage1.png)

---

### Invoice Management

![Invoice Page](docs/Screenshots/invoice/invoicepage1.png)

---

### Payment Management

![Payment Page](docs/Screenshots/payment/paymentpage1.png)

---

### Reports

![Reports](docs/Screenshots/reports/reportpage1.png)

---

### Search

![Search](docs/Screenshots/search/searchpage.png)

---

### System Architecture

![Architecture](docs/Screenshots/Architecture.png)

---

### Database ER Diagram

![ER Diagram](docs/Screenshots/Database-ERD.png)

--------

# Installation

## Clone Repository

```bash
git clone https://github.com/PittaShirisha-hub/mini-erp-crm
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
DATABASE_URL=postgresql://username:password@host:5432/database_name
JWT_SECRET=example_jwt_secret
PORT=5000
NODE_ENV=development
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