# Issue #25 - Update Order Status

## Goal

Allow restaurant admins to update order status following the allowed workflow.

---

## Endpoint

PATCH /orders/:id/status

---

## Access Level

ADMIN ONLY

Authentication required.

---

## Tasks

### Route Layer

* [x] Create PATCH /orders/:id/status
* [x] Protect route with JWT middleware
* [x] Protect route with Role middleware

### Controller Layer

* [x] Validate order id
* [x] Receive new status
* [x] Call service layer

### Service Layer

* [x] Find order
* [x] Return 404 if not found
* [x] Validate status transition
* [x] Update status
* [x] Return updated order

---

## Business Rules

Allowed transitions:

* PENDING → CONFIRMED
* PENDING → CANCELLED
* CONFIRMED → PREPARING
* CONFIRMED → CANCELLED
* PREPARING → DELIVERED

Everything else is invalid.

---

## Acceptance Criteria

* [x] Only ADMIN can update status
* [x] Invalid transitions return 400
* [x] Returns updated order
