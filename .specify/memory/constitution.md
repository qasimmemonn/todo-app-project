<<<<<<< HEAD
# [PROJECT_NAME] Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### [PRINCIPLE_1_NAME]
<!-- Example: I. Library-First -->
[PRINCIPLE_1_DESCRIPTION]
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### [PRINCIPLE_2_NAME]
<!-- Example: II. CLI Interface -->
[PRINCIPLE_2_DESCRIPTION]
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### [PRINCIPLE_3_NAME]
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
[PRINCIPLE_3_DESCRIPTION]
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

### [PRINCIPLE_6_NAME]


[PRINCIPLE__DESCRIPTION]

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
=======
<!--
  SYNC IMPACT REPORT
  ==================
  Version change: 0.0.0 → 1.0.0 (MAJOR - initial ratification)

  Added Principles:
  - I. Specs Before Code
  - II. No Feature Without Spec
  - III. No AI Logic Inside Business Logic
  - IV. No Skill Duplication Across Phases
  - V. Shared Skills as Single Source of Truth
  - VI. Phases Are Additive Not Destructive
  - VII. AI Acts Only Through Defined Tools
  - VIII. Agents Make Decisions Skills Do Work
  - IX. MCP Is the Only AI-Code Boundary
  - X. Constitutional Violation Protocol

  Added Sections:
  - Project Structure (Mandatory)
  - Phase Definitions (5 phases)
  - Agent Rules
  - MCP Rules
  - Governance

  Removed Sections: None (initial version)

  Templates Validated:
  - .specify/templates/plan-template.md ✅ (Constitution Check section present)
  - .specify/templates/spec-template.md ✅ (Requirements alignment verified)
  - .specify/templates/tasks-template.md ✅ (Phase structure compatible)

  Deferred Items: None
-->

# todo-ai-project Constitution

## Core Principles

### I. Specs Before Code

All implementation work MUST be preceded by a written specification. Code without a corresponding spec is considered unauthorized and MUST NOT be merged.

**Rationale**: Specifications ensure alignment between stakeholders, provide documentation for future maintainers, and enable proper planning before implementation effort is expended.

### II. No Feature Without Spec

Every feature, enhancement, or bug fix MUST have an associated specification document in the `specs/` directory before implementation begins.

**Rationale**: This ensures traceability, enables proper review of requirements before code review, and maintains a complete history of system decisions.

### III. No AI Logic Inside Business Logic

AI-related code (prompts, agent orchestration, model calls) MUST NOT exist within business logic modules. Business logic in `shared/skills/` MUST remain pure domain logic with no AI dependencies.

**Rationale**: Separation ensures business logic remains testable, portable, and independent of AI provider changes. It also prevents AI concerns from polluting core domain models.

### IV. No Skill Duplication Across Phases

Each phase MUST NOT re-implement or duplicate skills that exist in the `shared/skills/` directory. Phases may extend existing skills but MUST NOT fork or copy them.

**Rationale**: Duplication leads to drift, inconsistent behavior, and maintenance burden. Single implementation ensures consistency across all system phases.

### V. Shared Skills as Single Source of Truth

The `shared/` directory represents the authoritative core domain of the system. All business logic MUST live exclusively in `shared/skills/`. All phases MUST route feature implementations through shared skills.

**Rationale**: Centralizing business logic ensures consistent behavior regardless of which interface (CLI, web, AI) invokes it and simplifies testing and maintenance.

### VI. Phases Are Additive Not Destructive

Each phase MUST extend the previous phase without removing or breaking existing functionality. Phase N+1 MUST preserve all capabilities of Phase N.

**Rationale**: Additive phases enable incremental delivery, reduce regression risk, and allow stakeholders to validate each phase independently.

### VII. AI Acts Only Through Defined Tools

AI agents MUST NOT directly access databases, file systems, or external services. All AI actions MUST be mediated through explicitly defined MCP tools with documented schemas.

**Rationale**: Tool-mediated access provides auditability, rate limiting, validation, and security boundaries that prevent AI from causing unintended side effects.

### VIII. Agents Make Decisions Skills Do Work

Agents are decision-makers that select appropriate tools based on user intent. Agents MUST NOT contain business logic, store state, or access data directly. Skills (in `shared/skills/`) perform the actual work.

**Rationale**: This separation maintains testability, allows agent behavior to evolve independently of business logic, and ensures skills can be invoked from any context.

### IX. MCP Is the Only AI-Code Boundary

The Model Context Protocol (MCP) is the exclusive interface between AI agents and application code. Agents MUST interact with the system only through MCP servers and tools. No direct function calls or database access is permitted.

**Rationale**: A single, well-defined boundary simplifies security auditing, enables consistent logging, and provides a clear contract between AI and application layers.

### X. Constitutional Violation Protocol

Breaking any of the above principles is considered a constitutional violation. Violations MUST be flagged in code review, documented if exceptions are granted, and tracked for remediation.

**Rationale**: Explicit violation tracking prevents normalization of deviance and ensures the team remains accountable to architectural principles.

## Project Structure (Mandatory)

The project MUST follow this exact structure. This structure is final and authoritative.

```text
todo-ai-project/
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── specs/
│   ├── project-overview.md
│   └── architecture.md
├── shared/
│   ├── models/
│   │   └── task.py
│   ├── skills/
│   │   ├── task_skills.py
│   │   ├── auth_skills.py
│   │   └── reminder_skills.py
│   └── utils/
│       └── helpers.py
├── phase-1-core/
├── phase-2-web/
├── phase-3-ai/
├── phase-4-k8s/
├── phase-5-enterprise/
└── .gitignore
```

## Phase Definitions

### Phase 1: Core Logic (Console Todo)

**Purpose**: Establish the foundational domain logic of the Todo system.

**Allowed**: Console interaction, in-memory or basic persistence, Task CRUD logic

**Forbidden**: AI, Agents, MCP, Web APIs, Databases

**Required Structure**:
```text
phase-1-core/
├── app.py
├── README.md
└── specs/
```

**Outcome**: A fully working Todo core powered by `shared/skills/`.

### Phase 2: Web Application

**Purpose**: Expose the core logic via a real web system.

**Allowed**: REST APIs, Database integration, Authentication, Frontend UI

**Forbidden**: AI agents, MCP tools

**Rules**:
- APIs MUST call `shared/skills/`
- No business logic in routes/controllers

**Outcome**: A multi-user Todo web app backed by the same skills.

### Phase 3: AI + MCP

**Purpose**: Introduce AI safely and professionally.

**Mandatory Concepts**: Agents, MCP servers, MCP tools, Tool schemas

**Strict Rules**:
- Agents MUST NOT access skills directly
- Agents MUST NOT access databases
- Agents MUST use MCP tools exclusively
- MCP tools MUST delegate to shared skills

**Outcome**: A natural-language Todo system powered by safe AI orchestration.

### Phase 4: Kubernetes / Infrastructure

**Purpose**: Demonstrate cloud-native deployment capability.

**Allowed**: Docker, Kubernetes, Helm, Infrastructure automation

**Forbidden**: Business logic changes, Skill rewrites

**Outcome**: The same system, now deployable and scalable.

### Phase 5: Enterprise System

**Purpose**: Transform the system into an event-driven, production-grade platform.

**Allowed**: Kafka/PubSub, Dapr, Background services, Reminders, Recurring tasks, Event-driven workflows

**Rules**:
- New capabilities MUST be added as new skills
- Events MUST NOT bypass skills
- AI remains tool-bound

**Outcome**: A fully enterprise-ready Todo AI platform.

## Agent Rules

1. Agents are decision-makers, not workers
2. Agents MUST NOT store state
3. Agents MUST NOT access databases directly
4. Agents select MCP tools based on user intent
5. Agent behavior MUST be documented in `AGENTS.md`

## MCP Rules

1. MCP servers are stateless tool boundaries between AI and business logic
2. MCP tools MUST have documented schemas
3. MCP tools MUST delegate all business logic to `shared/skills/`
4. MCP tools MUST validate inputs before delegation
5. MCP tools MUST return structured responses

## Governance

### Amendment Procedure

1. Proposed amendments MUST be documented with rationale
2. Amendments MUST be reviewed by project stakeholders
3. Approved amendments MUST include a migration plan if breaking
4. All amendments MUST increment the constitution version

### Versioning Policy

- **MAJOR**: Backward-incompatible principle removals or redefinitions
- **MINOR**: New principles/sections added or materially expanded
- **PATCH**: Clarifications, wording fixes, non-semantic refinements

### Compliance Review

1. All PRs MUST verify compliance with constitutional principles
2. Complexity additions MUST be justified against principles
3. Constitutional violations MUST be flagged and tracked
4. Use `CLAUDE.md` for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2025-12-29 | **Last Amended**: 2025-12-29
>>>>>>> 96d0494f7200f6083fd5676ea0e58def7f190188
