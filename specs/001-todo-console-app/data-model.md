# Data Model: Todo Console App

## Entities

### Task
Represents a single item to be done.

- **id**: `int`
  - Unique identifier.
  - Auto-incrementing.
- **title**: `str`
  - Short name.
  - Required (Non-empty).
- **description**: `str`
  - Detailed text.
  - Optional (Default: Empty string).
- **completed**: `bool`
  - Completion status.
  - Default: `False`.

## Validation Rules

1. **Title Required**: `title.strip()` must not be empty.
2. **Task Existence**: Before Update/Delete/Toggle, the system must verify the `id` exists in the current session.
3. **ID Immutability**: The `id` must not be changeable after task creation.

## State Transitions

- **Pending** (Default upon creation)
- **Toggle** (Toggles `completed` status)
