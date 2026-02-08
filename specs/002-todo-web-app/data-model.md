# Phase 2 Web App Data Model

This document describes the data models used within the Phase 2 Web Application.

## Key Entities

*   **Task:** (Refer to shared models for core task structure)
    *   ... (any web-specific extensions or representations)
*   **User:**
    *   `id` (string): Unique identifier for the user.
    *   `username` (string): User's chosen username.
    *   `email` (string): User's email address.
    *   `preferences` (object): User-specific settings (e.g., theme, notifications).

## Relationships

*   Users own Tasks.
*   ...