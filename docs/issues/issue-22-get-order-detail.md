# Issue #23 - Get Order Details

## Goal

Retrieve details of a specific order.

---

## Endpoint

GET /orders/:id

---

## Access Level

Authenticated Users

* USER → only their own orders
* ADMIN → any order

---

## Tasks

### Route Layer

* [x] Create GET /orders/:id route
* [x] Protect route with JWT middleware

### Controller Layer

* [x] Get order id from params
* [x] Get authenticated user
* [x] Call service layer

### Service Layer

* [x] Find order by id
* [x] Return 404 if not found
* [x] If USER, verify order belongs to user
* [x] Return formatted response

---

## Error Responses

### Order Not Found

Status Code: 404

### Forbidden

Status Code: 403

---

## Acceptance Criteria

* [x] USER can view only their own order
* [x] ADMIN can view any order
* [x] Returns formatted response
* [x] Returns 404 if order doesn't exist
