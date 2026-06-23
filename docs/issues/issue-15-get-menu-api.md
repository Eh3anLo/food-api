# Issue #16 - Get Menu API

## Goal

Implement API to retrieve available menu items from the restaurant menu.

## Endpoint

```http
GET /menu
```

## Description

This endpoint returns all menu items that exist in the system.

Initially, all menu items should be returned.

In future versions, filtering and pagination can be added.


## Access Level

Public

Authentication is not required.


## Tasks

### Route Layer

* [ ] Create menu routes file
* [ ] Create GET `/menu` endpoint
* [ ] Register menu routes in server.js

### Controller Layer

* [ ] Create menu controller
* [ ] Handle incoming request
* [ ] Return formatted response

### Service Layer

* [ ] Create menu service
* [ ] Fetch menu items from database using Prisma

### Database Layer

* [ ] Query MenuItem table
* [ ] Return menu items ordered by creation date

## Prisma Query

Example:

```js
await prisma.menuItem.findMany();
```

---

## Success Response

Status Code: 200

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Pizza Margherita",
      "description": "Mozzarella cheese and tomato sauce",
      "price": 85000,
      "category": "MAIN_COURSE",
      "isAvailable": true
    },
    {
      "id": 2,
      "name": "Cola",
      "description": "Soft drink",
      "price": 15000,
      "category": "DRINK",
      "isAvailable": true
    }
  ]
}
```

---

## Error Handling

### Internal Server Error

Status Code: 500

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Acceptance Criteria

* [ ] GET `/menu` endpoint works
* [ ] Data retrieved from PostgreSQL via Prisma
* [ ] Returns list of menu items
* [ ] Returns HTTP 200 on success
* [ ] Response format is consistent

```
```
