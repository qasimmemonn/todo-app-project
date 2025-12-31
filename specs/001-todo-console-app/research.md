# Research: Todo Console App

## Technical Context

- **Language/Version**: Python 3.11 (Standard for this environment)
- **Primary Dependencies**: None (Standard library preferred for Phase 1)
- **Storage**: In-memory (Volatile list/dict)
- **Testing**: pytest (Robust and standard for Python)
- **Target Platform**: Windows 10/11 (win32 system)
- **Project Type**: Single console application
- **Performance Goals**: 100+ tasks without lag
- **Constraints**: Memory-only, no external database, simple CLI
- **Scale/Scope**: ~500 LOC, single file or small package

## Research Findings

### Decision: Python Standard Library (cmd or custom loop)
- **Rationale**: The requirements specify a simple "console-based menu". Python's `cmd` module provides a robust framework for line-oriented command interpreters, but a simple `while` loop with `input()` is more flexible for custom menu structures.
- **Alternatives Considered**:
  - `Click`: Excellent for CLI arguments, but might be overkill for a stateful interactive menu.
  - `Prompt Toolkit`: High performance/rich UI, but adds significant complexity and dependency.

### Decision: List of Dictionaries or Data Classes
- **Rationale**: Python `dataclasses` (available in 3.7+) provide clean, type-hinted structures for domain objects like `Task`.
- **Alternatives Considered**:
  - `dict`: Simple but lacks type safety and easy attribute access.

### Decision: Integration with Shared Skills
- **Rationale**: The constitution mandates that all business logic lives in `shared/skills/`. The console app will be a thin wrapper around these skills.
- **Protocol**:
  - CLI (in `phase-1-core/`) -> Skills (in `shared/skills/`) -> Models (in `shared/models/`).

## Needs Clarification (Resolved)
- **Topic**: Unique ID generation.
- **Resolution**: Use a simple integer counter stored in the storage service. Use `itertools.count()` for a clean, thread-safe (if needed later) auto-incrementing ID.
- **Topic**: State Toggling.
- **Resolution**: Marking complete/incomplete will be a single toggle function if ID exists, or separate `mark_complete` / `mark_incomplete` methods. FR-007 explicitly says "toggling".
