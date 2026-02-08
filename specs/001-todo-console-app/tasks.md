# Tasks: 001-todo-console-app

## Feature Details
- **Feature Name**: Todo Console App
- **Feature Branch**: `001-todo-console-app`
- **Spec**: `specs/001-todo-console-app/spec.md`
- **Implementation Plan**: `specs/001-todo-console-app/plan.md`

## Implementation Strategy
We will follow the Spec-Driven Development (SDD) process, starting with the foundation and then implementing each user story in priority order (P1 -> P2 -> P3). Each story will be a complete, testable increment.

## Phase 1: Setup
- [x] T001 Initialize project structure (folders) according to plan.md
- [x] T002 Setup pytest environment in tests/

## Phase 2: Foundational
- [x] T003 [P] Define Task model in shared/models/task.py
- [x] T004 Define TaskSkills interface stub in shared/skills/task_skills.py

## Phase 3: User Story 1 - Create and View Tasks
**Goal**: Add tasks and list them to verify they are stored.
**Test Criteria**: Add two tasks, list them, verify details and incrementing IDs.

- [x] T005 [P] [US1] Create unit tests for add and list in tests/unit/test_skills.py
- [x] T006 [US1] Implement add_task in shared/skills/task_skills.py
- [x] T007 [US1] Implement get_all_tasks in shared/skills/task_skills.py
- [x] T008 [US1] Create console UI stub with Add and List in phase-1-core/app.py
- [x] T009 [US1] Integration: Verify Add/List flow via CLI in tests/integration/test_cli.py

## Phase 4: User Story 2 - Task Completion
**Goal**: Mark tasks as complete.
**Test Criteria**: Add task, verify incomplete, toggle complete, verify complete.

- [x] T010 [P] [US2] Update unit tests for toggle in tests/unit/test_skills.py
- [x] T011 [US2] Implement toggle_task_completion in shared/skills/task_skills.py
- [x] T012 [US2] Add Toggle command to console UI in phase-1-core/app.py
- [x] T013 [US2] Integration: Verify Toggle flow via CLI in tests/integration/test_cli.py

## Phase 5: User Story 3 - Management (Update/Delete)
**Goal**: Edit or remove tasks.
**Test Criteria**: Update title, verify; delete task, verify gone.

- [x] T014 [P] [US3] Update unit tests for update/delete in tests/unit/test_skills.py
- [x] T015 [US3] Implement update_task in shared/skills/task_skills.py
- [x] T016 [US3] Implement delete_task in shared/skills/task_skills.py
- [x] T017 [US3] Add Update and Delete commands to console UI in phase-1-core/app.py
- [x] T018 [US3] Integration: Verify Update/Delete flow via CLI in tests/integration/test_cli.py

## Phase 6: Polish & Cross-Cutting
- [ ] T019 Handle invalid ID errors across all UI commands
- [ ] T020 Implement input validation for empty titles in UI
- [ ] T021 Final project README update in phase-1-core/README.md

## Dependencies
US1 -> US2 -> US3

## Parallel Execution Opportunities
- T003 (Model) and T005 (US1 Tests) can be done in parallel once structure is set.
- T010 (US2 Tests) and T014 (US3 Tests) can be setup independently of core logic.
