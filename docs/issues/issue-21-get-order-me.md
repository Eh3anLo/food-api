# Issue #22 - Get My Orders

## Goal

Allow authenticated users to retrieve only their own orders.

---

## Endpoint

GET /orders/my

---

## Access Level

USER ONLY

Authentication required.

---

## Tasks

### Route Layer

* [x] Create GET /orders/my route
* [x] Protect route with JWT middleware
* [x] Protect route with Role middleware

### Controller Layer

* [x] Get authenticated user id
* [x] Call service layer
* [x] Return user's orders

### Service Layer

* [x] Retrieve orders belonging to authenticated user
* [x] Include order items
* [x] Format response

---

## Success Response

Status Code: 200

```json
{
  "status": "success",
  "data": [
    {
      "order_id": 15,
      "total_price": 255000,
      "status": "PENDING",
      "created_at": "2026-06-26T15:30:00.000Z",
      "items": [
        {
          "name": "Pizza Margherita",
          "quantity": 2,
          "price": 85000
        }
      ]
    }
  ]
}
```

---

## Acceptance Criteria

* [x] User only sees their own orders
* [x] Order items are included
* [x] Returns HTTP 200
