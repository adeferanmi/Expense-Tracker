# Expense Tracker API Documentation

This document logs the core REST API endpoints that connect our frontend dashboard to our backend database.

## 1. Authentication Endpoints

### `POST /api/auth/register`
*   **Description:** Registers a new user account.
*   **Request Body:**
    ```json
    {
      "username": "brian_cs",
      "email": "brian@pau.edu.ng",
      "password": "securepassword123"
    }
*    **Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "userId": "usr_98765"
}

---

## 2. Expense Endpoints

### `POST/api/expenses`
*   **Description:** Creates a new expense entry for the authenticated user.
*   **Headers:** `Authorization: Bearer <token>`
*   **Request Body:**
    ```json
    {
      "amount": 2500.00,
      "category": "Transport",
      "description": "Campus shuttle fare",
      "date": "2026-05-17"
    }
    ```
*  **Success Response (201 Created):**
    ```json
    {
      "status": "success",
      "data": {
        "id": "exp_12345",
        "amount": 2500.00,
        "category": "Transport",
        "date": "2026-05-17"
      }
    }