# Quickstart: Todo Console App

## Environment Setup
- Python 3.11+ required.
- No external dependencies for Phase 1.

## Running the App
From the project root:
```bash
python phase-1-core/app.py
```

## Menu Options
1. **Add Task**: Prompts for title and optional description.
2. **List Tasks**: Shows all tasks with ID and status.
3. **Complete Task**: Toggle [✓/ ] by entering ID.
4. **Update Task**: Edit title/description by ID.
5. **Delete Task**: Remove task by ID.
6. **Exit**: Close the application.

## Development Workflow
1. Define model in `shared/models/task.py`.
2. Implement logic in `shared/skills/task_skills.py`.
3. Build CLI wrapper in `phase-1-core/app.py`.
