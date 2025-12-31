from typing import List, Optional
from itertools import count
from shared.models.task import Task

# In-memory storage for tasks
_tasks: List[Task] = []
# Auto-incrementing ID generator starting from 1
_id_gen = count(1)

def add_task(title: str, description: str = "") -> Task:
    """
    Creates a new task.

    Args:
        title: Short name for the task.
        description: Detailed text for the task.

    Returns:
        The newly created Task object.

    Raises:
        ValueError: If the title is empty or only whitespace.
    """
    if not title or not title.strip():
        raise ValueError("Task title cannot be empty.")

    task_id = next(_id_gen)
    new_task = Task(id=task_id, title=title.strip(), description=description.strip())
    _tasks.append(new_task)
    return new_task

def get_all_tasks() -> List[Task]:
    """
    Retrieves all tasks currently in memory.

    Returns:
        A list of all Task objects.
    """
    return list(_tasks)

def get_task_by_id(task_id: int) -> Task:
    """
    Retrieves a single task by its ID.

    Args:
        task_id: The unique identifier of the task.

    Returns:
        The Task object if found.

    Raises:
        LookupError: If no task with the given ID exists.
    """
    for task in _tasks:
        if task.id == task_id:
            return task
    raise LookupError(f"Task with ID {task_id} not found.")

def update_task(task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Task:
    """
    Updates fields of an existing task.

    Args:
        task_id: The ID of the task to update.
        title: New title for the task (optional).
        description: New description for the task (optional).

    Returns:
        The updated Task object.

    Raises:
        LookupError: If the ID is not found.
        ValueError: If title is provided but empty/whitespace.
    """
    task = get_task_by_id(task_id)

    new_title = task.title
    new_description = task.description

    if title is not None:
        if not title.strip():
            raise ValueError("Updated task title cannot be empty.")
        new_title = title.strip()

    if description is not None:
        new_description = description.strip()

    # Since Task is frozen, we need to replace it in the list
    updated_task = Task(id=task.id, title=new_title, description=new_description, completed=task.completed)
    index = _tasks.index(task)
    _tasks[index] = updated_task

    return updated_task

def toggle_task_completion(task_id: int) -> Task:
    """
    Toggles the completed status of a task.

    Args:
        task_id: The ID of the task to toggle.

    Returns:
        The updated Task object.

    Raises:
        LookupError: If the ID is not found.
    """
    task = get_task_by_id(task_id)

    # Since Task is frozen, we need to replace it
    updated_task = Task(id=task.id, title=task.title, description=task.description, completed=not task.completed)
    index = _tasks.index(task)
    _tasks[index] = updated_task

    return updated_task

def delete_task(task_id: int) -> None:
    """
    Removes a task from storage.

    Args:
        task_id: The ID of the task to delete.

    Raises:
        LookupError: If the ID is not found.
    """
    task = get_task_by_id(task_id)
    _tasks.remove(task)
