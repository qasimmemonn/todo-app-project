import subprocess
import os
import sys

def run_app(inputs):
    """Runs the app and provides the given inputs to stdin."""
    app_path = os.path.join(os.path.dirname(__file__), '../../phase-1-core/app.py')
    # Use the same python executable that is running this test
    process = subprocess.Popen(
        [sys.executable, app_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    stdout, stderr = process.communicate(input="\n".join(inputs) + "\n")
    if process.returncode != 0:
        print(f"STDOUT: {stdout}")
        print(f"STDERR: {stderr}")
    return stdout, stderr, process.returncode

def test_add_and_list_flow():
    """Integration test for adding a task and listing it."""
    # 1. Add Task (Choice 1)
    # 2. Title: "Integration Task"
    # 3. Description: "Integration Description"
    # 4. List Tasks (Choice 2)
    # 5. Exit (Choice 6)
    inputs = ["1", "Integration Task", "Integration Description", "2", "6"]
    stdout, stderr, returncode = run_app(inputs)

    assert returncode == 0
    assert "Success: Task added with ID 1" in stdout
    assert "ID: 1 | Status: [ ] Incomplete | Title: Integration Task" in stdout
    assert "Description: Integration Description" in stdout
    assert "Exiting. Goodbye!" in stdout

def test_add_task_validation():
    """Integration test for adding a task with empty title."""
    # 1. Add Task (Choice 1)
    # 2. Title: ""
    # 3. Exit (Choice 6)
    inputs = ["1", "  ", "6"] # Choice 1, then space title, then 6 to exit
    stdout, stderr, returncode = run_app(inputs)

    assert returncode == 0
    assert "Error: Task title cannot be empty." in stdout
    assert "Exiting. Goodbye!" in stdout

def test_toggle_flow():
    """Integration test for toggling a task's completion status."""
    # 1. Add Task
    # 2. Toggle Task
    # 3. List to verify
    # 4. Exit
    inputs = ["1", "Toggle Me", "", "3", "1", "2", "6"]
    stdout, stderr, returncode = run_app(inputs)

    assert returncode == 0
    assert "Success: Task 1 is now Complete." in stdout
    assert "ID: 1 | Status: [X] Complete | Title: Toggle Me" in stdout

def test_update_flow():
    """Integration test for updating a task."""
    inputs = ["1", "Old Title", "Old Desc", "4", "1", "New Title", "", "2", "6"]
    stdout, stderr, returncode = run_app(inputs)

    assert returncode == 0
    assert "Success: Task 1 updated." in stdout
    assert "ID: 1 | Status: [ ] Incomplete | Title: New Title" in stdout
    assert "Description: Old Desc" in stdout

def test_delete_flow():
    """Integration test for deleting a task."""
    inputs = ["1", "To Delete", "", "5", "1", "2", "6"]
    stdout, stderr, returncode = run_app(inputs)

    assert returncode == 0
    assert "Success: Task 1 deleted." in stdout
    assert "No tasks found." in stdout
