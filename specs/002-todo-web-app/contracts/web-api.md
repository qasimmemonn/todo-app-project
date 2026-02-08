# Phase 2 Web App API Contracts

This document specifies the API contracts that the Phase 2 Web Application will interact with.

## Base URL

`<backend-api-base-url>/api/v1`

## Authentication Endpoints

### `POST /auth/register`

*   **Description:** Register a new user.
*   **Request Body:**
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
*   **Response:**
    ```json
    {
        "message": "User registered successfully",
        "userId": "uuid"
    }
    ```

### `POST /auth/login`

*   **Description:** Authenticate user and receive access token.
*   **Request Body:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
*   **Response:**
    ```json
    {
        "message": "Login successful",
        "accessToken": "jwt_token_string"
    }
    ```

## Task Endpoints (Requires Authentication)

### `GET /tasks`

*   **Description:** Retrieve all tasks for the authenticated user.
*   **Response:**
    ```json
    [
        {
            "id": "uuid",
            "title": "string",
            "description": "string",
            "dueDate": "YYYY-MM-DD",
            "isComplete": "boolean"
        },
        ...
    ]
    ```

### `POST /tasks`

*   **Description:** Create a new task.
*   **Request Body:**
    ```json
    {
        "title": "string",
        "description": "string",
        "dueDate": "YYYY-MM-DD"
    }
    ```
*   **Response:**
    ```json
    {
        "message": "Task created successfully",
        "task": {
            "id": "uuid",
            "title": "string",
            "description": "string",
            "dueDate": "YYYY-MM-DD",
            "isComplete": "boolean"
        }
    }
    ```

### `PUT /tasks/{id}`

*   **Description:** Update an existing task.
*   **Request Body:**
    ```json
    {
        "title": "string",
        "description": "string",
        "dueDate": "YYYY-MM-DD",
        "isComplete": "boolean"
    }
    ```
*   **Response:**
    ```json
    {
        "message": "Task updated successfully",
        "task": {
            "id": "uuid",
            "title": "string",
            "description": "string",
            "dueDate": "YYYY-MM-DD",
            "isComplete": "boolean"
        }
    }
    ```

### `DELETE /tasks/{id}`

*   **Description:** Delete a task.
*   **Response:**
    ```json
    {
        "message": "Task deleted successfully"
    }
    ```