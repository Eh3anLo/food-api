# Issue #18 - Create Menu Item API

## Goal

Allow restaurant admins to add new menu items.

---

## Endpoint

POST /menu

---

## Access Level

ADMIN ONLY

Authentication required.

---

## Tasks

### Route Layer

- [x] Create POST /menu route
- [x] Protect route with JWT middleware
- [x] Protect route with Role middleware

### Controller Layer

- [x] Receive request body
- [x] Call service layer
- [x] Return created menu item

### Service Layer

- [x] Create menu item in database
- [x] Return created item

### Database Layer

- [x] Insert new menu item using Prisma

---

## Request Body

```json
{
  "name": "Pizza Margherita",
  "description": "Mozzarella cheese and tomato sauce",
  "price": 85000,
  "category": "MAIN_COURSE",
  "isAvailable": true
}
```