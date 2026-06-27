# Issue #24 - Get All Orders (Admin)

## Goal

Allow administrators to retrieve all orders.

---

## Endpoint

GET /orders

---

## Access Level

ADMIN ONLY

Authentication required.

---

## Tasks

### Route Layer

* [x] Create GET /orders route
* [x] Protect route with JWT middleware
* [x] Protect route with Role middleware

### Controller Layer

* [x] Call service layer
* [x] Return formatted response

### Service Layer

* [x] Retrieve all orders
* [x] Include order items
* [x] Sort by newest first
* [x] Format response

---

## Success Response

Status Code: 200

---

## Acceptance Criteria

* [x] Only ADMIN can access
* [x] Returns all orders
* [x] Orders sorted by newest
* [x] Includes order items
