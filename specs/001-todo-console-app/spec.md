# Feature Specification: Phase 1 – Todo In-Memory Console App

**Feature Branch**: `001-todo-console-app`
**Created**: 2025-12-30
**Status**: Draft
**Input**: User description: "Phase 1 – Todo In-Memory Console App (Spec) - Build a command-line Todo application..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View Tasks (Priority: P1)

As a user, I want to add new tasks and immediately see them in a list so I can verify my to-do list is growing.

**Why this priority**: Core functionality that forms the base of the application. Without adding and viewing, the app has no value.

**Independent Test**: Can be fully tested by adding two tasks and running the "List Tasks" command to verify both appear with the correct details.

**Acceptance Scenarios**:

1. **Given** no tasks exist, **When** I add a task with title "Buy milk", **Then** the task is stored with ID 1 and I see a success message.
2. **Given** one task exists, **When** I select "List Tasks", **Then** I see the task with ID, title, and "Incomplete" status.

---

### User Story 2 - Task Completion (Priority: P2)

As a user, I want to mark tasks as complete so I can track my progress.

**Why this priority**: Essential for a "to-do" application to be useful for productivity.

**Independent Test**: Add a task, list it (verify incomplete), mark it complete, list it again (verify complete).

**Acceptance Scenarios**:

1. **Given** an incomplete task exists, **When** I mark it complete by its ID, **Then** its status changes to "[✓] Complete".
2. **Given** a complete task exists, **When** I mark it complete (toggle) or incomplete, **Then** its status reverts to "[ ] Incomplete".

---

### User Story 3 - Management (Update/Delete) (Priority: P3)

As a user, I want to edit task details or remove tasks I no longer need.

**Why this priority**: Maintenance features for long-term usage.

**Independent Test**: Update a task's title and verify the change in the list; delete a task and verify it's gone from the list.

**Acceptance Scenarios**:

1. **Given** a task exists, **When** I update its title, **Then** only the title changes and other fields remain the same.
2. **Given** multiple tasks, **When** I delete one by ID, **Then** it is removed and does not appear in subsequent listings.

---

### Edge Cases

- **Empty Title**: Attempting to add a task with an empty or whitespace-only title should trigger a validation error.
- **Invalid ID**: Providing a non-existent ID for update, delete, or complete should show a "Task not found" error.
- **Large Volume**: The system should handle at least 100 tasks in memory without performance degradation.
- **Duplicate Titles**: Should be allowed, as uniqueness is enforced by the system-generated ID.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store tasks in volatile memory (no persistent storage required).
- **FR-002**: System MUST assign a unique, auto-incrementing integer ID to every new task.
- **FR-003**: System MUST require a title for every task.
- **FR-004**: System MUST allow an optional description for tasks.
- **FR-005**: System MUST provide a console-based menu for all operations.
- **FR-006**: System MUST validate that a task exists before performing update, delete, or completion operations.
- **FR-007**: System MUST support toggling a task between complete and incomplete states.

### Key Entities *(include if feature involves data)*

- **Task**: Represents a single item to be done.
  - `id`: Unique identifier (Integer)
  - `title`: Short name (String, Required)
  - `description`: Detailed text (String, Optional)
  - `completed`: Completion status (Boolean, Default: False)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the "Add Task -> List Tasks -> Mark Complete" flow in under 15 seconds.
- **SC-002**: 100% of tasks added are retrievable and correctly displayed in the list command during the session.
- **SC-003**: Validation prevents 100% of attempts to add tasks without a title.
- **SC-004**: System provides clear error feedback for 100% of invalid ID inputs.
