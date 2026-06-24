# Issue #19 - Update Menu Item API

## Goal

Allow restaurant admins to update existing menu items.

---

## Endpoint

PUT /menu/:id

---

## Access Level

ADMIN ONLY

Authentication required.

---

## Tasks

### Route Layer

* [ ] Create PUT /menu/:id route
* [ ] Protect route with JWT middleware
* [ ] Protect route with Role middleware

### Controller Layer

* [ ] Get id from params
* [ ] Get updated data from request body
* [ ] Call service layer
* [ ] Return updated menu item

### Service Layer

* [ ] Find menu item by id
* [ ] Return 404 if item does not exist
* [ ] Update menu item
* [ ] Return updated item

### Database Layer

* [ ] Update record using Prisma

---

## Request Body

```json
{
  "name": "Updated Pizza",
  "description": "New Description",
  "price": 95000,
  "category": "MAIN_COURSE",
  "isAvailable": true
}
```

---

## Success Response

Status Code: 200

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Updated Pizza",
    "description": "New Description",
    "price": 95000,
    "category": "MAIN_COURSE",
    "isAvailable": true
  }
}
```

---

## Error Response

### Menu Item Not Found

Status Code: 404

```json
{
  "status": "error",
  "message": "Menu item not found"
}
```

---

## Acceptance Criteria

* [ ] Only ADMIN can update menu items
* [ ] Existing item is updated
* [ ] Returns updated item
* [ ] Returns 404 if item does not exist
* [ ] Returns HTTP 200 on success

```
```
