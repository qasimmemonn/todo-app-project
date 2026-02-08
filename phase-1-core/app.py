import sys
import os

# Add the project root to sys.path to allow importing from shared
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from shared.skills.task_skills import (
    add_task, get_all_tasks, toggle_task_completion,
    update_task, delete_task
)

def print_menu():
    print("\n--- Todo Console App ---")
    print("1. Add Task")
    print("2. List Tasks")
    print("3. Toggle Task Completion")
    print("4. Update Task")
    print("5. Delete Task")
    print("6. Exit")

def add_task_ui():
    print("\n--- Add Task ---")
    title = input("Enter title: ").strip()
    if not title:
        print("Error: Task title cannot be empty.")
        return
    description = input("Enter description (optional): ").strip()

    try:
        task = add_task(title, description)
        print(f"Success: Task added with ID {task.id}")
    except ValueError as e:
        print(f"Error: {e}")

def list_tasks_ui():
    print("\n--- List Tasks ---")
    tasks = get_all_tasks()
    if not tasks:
        print("No tasks found.")
        return

    for task in tasks:
        # Avoid Unicode characters that might fail on some Windows consoles
        status = "[X] Complete" if task.completed else "[ ] Incomplete"
        print(f"ID: {task.id} | Status: {status} | Title: {task.title}")
        if task.description:
            print(f"   Description: {task.description}")

def toggle_task_ui():
    print("\n--- Toggle Task Completion ---")
    try:
        user_input = input("Enter task ID to toggle: ").strip()
        if not user_input:
            print("Error: Task ID required.")
            return
        task_id = int(user_input)
        task = toggle_task_completion(task_id)
        status = "Complete" if task.completed else "Incomplete"
        print(f"Success: Task {task.id} is now {status}.")
    except ValueError:
        print("Error: Invalid ID. Please enter a number.")
    except LookupError as e:
        print(f"Error: {e}")

def update_task_ui():
    print("\n--- Update Task ---")
    try:
        user_input = input("Enter task ID to update: ").strip()
        if not user_input:
            print("Error: Task ID required.")
            return
        task_id = int(user_input)

        title = input("Enter new title (leave blank to keep current): ").strip()
        description = input("Enter new description (leave blank to keep current): ").strip()

        title_arg = title if title else None
        description_arg = description if description else None

        task = update_task(task_id, title=title_arg, description=description_arg)
        print(f"Success: Task {task.id} updated.")
    except ValueError as e:
        if "invalid literal for int()" in str(e):
            print("Error: Invalid ID. Please enter a number.")
        else:
            print(f"Error: {e}")
    except LookupError as e:
        print(f"Error: {e}")

def delete_task_ui():
    print("\n--- Delete Task ---")
    try:
        user_input = input("Enter task ID to delete: ").strip()
        if not user_input:
            print("Error: Task ID required.")
            return
        task_id = int(user_input)
        delete_task(task_id)
        print(f"Success: Task {task_id} deleted.")
    except ValueError:
        print("Error: Invalid ID. Please enter a number.")
    except LookupError as e:
        print(f"Error: {e}")

def main():
    while True:
        print_menu()
        choice = input("Enter choice (1-6): ").strip()

        if choice == '1':
            add_task_ui()
        elif choice == '2':
            list_tasks_ui()
        elif choice == '3':
            toggle_task_ui()
        elif choice == '4':
            update_task_ui()
        elif choice == '5':
            delete_task_ui()
        elif choice == '6':
            print("Exiting. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
