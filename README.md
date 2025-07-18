# Appointment Booking Backend API

# Install dependencies
npm install

# Run migrations
npx prisma migrate dev

# Start dev server
npm run start:dev

This backend powers a multi-role appointment booking system with **Clients**, **Providers**, and **Admins**.

### Tech Stack
- **NestJS** – backend framework
- **Prisma** – ORM for PostgreSQL
- **PostgreSQL** – database
- **JWT** – authentication
- **Role-based access control** – for secure routes

---

## Features

### User Roles
- `CLIENT`: Can browse availability and book appointments
- `PROVIDER`: Can add their available time slots
- `ADMIN`: (optional) Can manage users and bookings

---

## Auth Flow

- **Login/Register**
- Returns JWT token
- Token stores `userId` and `role`
- All protected routes require token in `Authorization: Bearer <token>`

---

## Modules

### Auth
- `POST /auth/signup` → Register user
- `POST /auth/login` → Login and get token

### Provider
- `POST /provider` → Register as provider (only `PROVIDER` role)
- `GET /provider` → Get all providers

### Availability
- `POST /availability` → Add slot (only `PROVIDER`)
- `GET /availability/providerAvailability` → Get provider's own slots
- `GET /availability` → Get all unbooked slots (for clients)

### Booking
- `POST /booking` → Client books a slot (clientId from token)
- `GET /booking/client/my` → Get bookings for logged-in client

---