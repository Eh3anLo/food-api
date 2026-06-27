# Issue #26 - Request Validation with Zod

## Goal

Validate all incoming request bodies using Zod schemas.

---

## Why?

- Prevent invalid data from reaching services
- Keep controllers clean
- Return consistent 400 errors
- Centralize validation logic

---

## Tasks

### Create Validation Folder

- [ ] Create `src/validations`

### Authentication

- [ ] Register Schema
- [ ] Login Schema

### Menu

- [ ] Create Menu Schema
- [ ] Update Menu Schema

### Orders

- [ ] Create Order Schema
- [ ] Update Order Status Schema

### Middleware

- [ ] Create validate middleware
- [ ] Handle validation errors

---

## Acceptance Criteria

- [ ] All POST/PUT/PATCH endpoints use Zod
- [ ] Invalid requests return HTTP 400
- [ ] Controllers no longer manually validate input