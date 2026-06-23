# Issue #17 - Get Menu Item API

## Goal

Retrieve a single menu item by its ID.

---

## Endpoint

GET /menu/:id

---

## Access Level

Public

Authentication is not required.

---

## Tasks

### Route Layer

- [x] Create GET /menu/:id route

### Controller Layer

- [x] Extract id from request params
- [x] Call service layer
- [x] Return formatted response

### Service Layer

- [x] Find menu item by id
- [x] Throw error if item does not exist

### Error Handling

- [x] Return 404 if menu item not found

---

## Success Response

Status Code: 200

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Pizza Margherita",
    "description": "Mozzarella cheese and tomato sauce",
    "price": 85000,
    "category": "MAIN_COURSE",
    "isAvailable": true
  }
}