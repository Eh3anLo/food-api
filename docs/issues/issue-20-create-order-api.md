# Issue #21 - Create Order API

## Goal

Allow authenticated users to place food orders.

## Endpoint

POST /orders

## Access Level

USER ONLY

Authentication required.

---

## Tasks

### Route Layer

* [ ] Create POST /orders route
* [ ] Protect route with JWT middleware
* [ ] Protect route with Role middleware

### Controller Layer

* [ ] Receive order request
* [ ] Validate order items
* [ ] Call service layer

### Service Layer

* [ ] Verify all menu items exist
* [ ] Verify menu items are available
* [ ] Verify quantity > 0
* [ ] Calculate total price
* [ ] Create order
* [ ] Create order items
* [ ] Return order summary

### Database Layer

* [ ] Insert into orders table
* [ ] Insert into order_items table

---

## Request Body

```json
{
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    },
    {
      "menuItemId": 3,
      "quantity": 1
    }
  ]
}
```

---

## Business Rules

* User must be authenticated
* User role must be USER
* Quantity must be greater than zero
* Menu item must exist
* Menu item must be available
* Total price must be calculated by server

---

## Success Response

Status Code: 201

```json
{
  "status": "success",
  "data": {
    "orderId": 15,
    "totalPrice": 255000,
    "status": "PENDING"
  }
}
```

---

## Error Responses

### Invalid Quantity

Status Code: 400

### Menu Item Not Found

Status Code: 404

### Item Not Available

Status Code: 400

---

## Acceptance Criteria

* [ ] Order successfully created
* [ ] Order items successfully created
* [ ] Total price calculated on server
* [ ] Invalid quantity rejected
* [ ] Unavailable menu items rejected
* [ ] User can place order

```
```
