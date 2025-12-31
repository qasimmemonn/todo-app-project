# Service Interface: TaskSkills

This document defines the functional interface for the Todo system business logic, residing in `shared/skills/task_skills.py`.

## Operations

### `add_task(title: str, description: str = "") -> Task`
- **Description**: Creates a new task.
- **Errors**: `ValueError` if title is empty.

### `get_all_tasks() -> List[Task]`
- **Description**: Retrieves all tasks currently in memory.

### `get_task_by_id(task_id: int) -> Task`
- **Description**: Retrieves a single task.
- **Errors**: `LookupError` if ID not found.

### `update_task(task_id: int, title: str = None, description: str = None) -> Task`
- **Description**: Updates fields of an existing task.
- **Errors**: `LookupError` if ID not found.

### `toggle_task_completion(task_id: int) -> Task`
- **Description**: Toggles the `completed` status of a task.
- **Errors**: `LookupError` if ID not found.

### `delete_task(task_id: int) -> None`
- **Description**: Removes a task from storage.
- **Errors**: `LookupError` if ID not found.
