import pytest
from shared.skills.task_skills import (
    add_task, get_all_tasks, get_task_by_id, update_task,
    toggle_task_completion, delete_task, _tasks, _id_gen
)
from itertools import count

@pytest.fixture(autouse=True)
def reset_storage():
    """Resets the in-memory storage before each test."""
    _tasks.clear()
    import shared.skills.task_skills as task_skills
    task_skills._id_gen = count(1)

def test_add_task_success():
    """Test successfully adding a task."""
    task = add_task("Buy groceries", "Milk, Bread, Eggs")
    assert task.id == 1
    assert task.title == "Buy groceries"
    assert task.description == "Milk, Bread, Eggs"
    assert task.completed is False
    assert len(get_all_tasks()) == 1

def test_add_task_empty_title():
    """Test adding a task with an empty title raises ValueError."""
    with pytest.raises(ValueError, match="Task title cannot be empty."):
        add_task("")

def test_add_task_whitespace_title():
    """Test adding a task with a whitespace title raises ValueError."""
    with pytest.raises(ValueError, match="Task title cannot be empty."):
        add_task("   ")

def test_get_all_tasks_empty():
    """Test get_all_tasks returns an empty list initially."""
    assert get_all_tasks() == []

def test_get_all_tasks_multiple():
    """Test get_all_tasks returns all added tasks."""
    add_task("Task 1")
    add_task("Task 2")
    tasks = get_all_tasks()
    assert len(tasks) == 2
    assert tasks[0].title == "Task 1"
    assert tasks[1].title == "Task 2"
    assert tasks[0].id == 1
    assert tasks[1].id == 2

def test_get_task_by_id_success():
    """Test retrieving a task by ID."""
    task = add_task("Test Task")
    retrieved = get_task_by_id(task.id)
    assert retrieved.id == task.id
    assert retrieved.title == "Test Task"

def test_get_task_by_id_not_found():
    """Test retrieving a non-existent task by ID rises LookupError."""
    with pytest.raises(LookupError, match="Task with ID 999 not found."):
        get_task_by_id(999)

def test_update_task_success():
    """Test updating a task's title and description."""
    task = add_task("Old Title", "Old Description")
    updated = update_task(task.id, title="New Title", description="New Description")
    assert updated.id == task.id
    assert updated.title == "New Title"
    assert updated.description == "New Description"

    # Verify in storage
    in_storage = get_task_by_id(task.id)
    assert in_storage.title == "New Title"

def test_update_task_partial():
    """Test updating only one field of a task."""
    task = add_task("Title", "Description")
    updated = update_task(task.id, title="Only Title Change")
    assert updated.title == "Only Title Change"
    assert updated.description == "Description"

def test_update_task_invalid_title():
    """Test updating a task with an empty title raises ValueError."""
    task = add_task("Title")
    with pytest.raises(ValueError, match="Updated task title cannot be empty."):
        update_task(task.id, title=" ")

def test_toggle_task_completion():
    """Test toggling task completion status and ensuring no other fields change."""
    task = add_task("Original Title", "Original Description")
    assert task.completed is False

    updated = toggle_task_completion(task.id)
    assert updated.completed is True
    assert updated.title == "Original Title"
    assert updated.description == "Original Description"

    updated = toggle_task_completion(task.id)
    assert updated.completed is False
    assert updated.title == "Original Title"
    assert updated.description == "Original Description"

def test_delete_task_success():
    """Test deleting a task."""
    task = add_task("To Delete")
    assert len(get_all_tasks()) == 1
    delete_task(task.id)
    assert len(get_all_tasks()) == 0
    with pytest.raises(LookupError):
        get_task_by_id(task.id)

def test_delete_task_not_found():
    """Test deleting a non-existent task raises LookupError."""
    with pytest.raises(LookupError):
        delete_task(999)
