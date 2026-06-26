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

* [ ] Create GET /orders/:id route
* [ ] Protect route with JWT middleware

### Controller Layer

* [ ] Get order id from params
* [ ] Get authenticated user
* [ ] Call service layer

### Service Layer

* [ ] Find order by id
* [ ] Return 404 if not found
* [ ] If USER, verify order belongs to user
* [ ] Return formatted response

---

## Error Responses

### Order Not Found

Status Code: 404

### Forbidden

Status Code: 403

---

## Acceptance Criteria

* [ ] USER can view only their own order
* [ ] ADMIN can view any order
* [ ] Returns formatted response
* [ ] Returns 404 if order doesn't exist
