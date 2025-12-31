---
id: 001
title: Initial Constitution Ratification
stage: constitution
date: 2025-12-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: architect
command: /sp.constitution
labels: ["constitution", "governance", "principles", "multi-phase", "ai-safety"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - N/A (governance document)
---

## Prompt

Project Name: todo-ai-project
Project Type: Spec-Driven, AI-Assisted, Multi-Phase System
Primary Goal:
Build a Todo system that evolves step-by-step from a simple core application into an AI-driven, cloud-native, enterprise-grade system using strict spec-driven development principles.

This project MUST demonstrate:

Progressive system evolution

Clear separation of concerns

Safe and controlled AI usage

Industry-grade architecture thinking

2. NON-NEGOTIABLE CORE PRINCIPLES

These rules MUST be followed at all times:

Specs come before code

No feature without a spec

No AI logic inside business logic

No duplication of skills across phases

Shared skills are the single source of truth

Each phase extends the previous phase

Phases are additive, not destructive

AI can only act through defined tools

Agents make decisions, skills do work

MCP is the only boundary between AI and code

Breaking any of these rules is considered a constitutional violation.

3. REQUIRED PROJECT STRUCTURE (MUST NOT CHANGE)

The project MUST follow this exact structure:

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

4. SHARED LAYER — SINGLE SOURCE OF TRUTH

The shared/ directory represents the core domain of the system.

Rules:
- All business logic lives ONLY in shared/skills
- No phase is allowed to re-implement or duplicate skills
- Phases may extend skills, but never fork them
- If a feature exists, it must ultimately route through shared/skills.

5. PHASE DEFINITIONS (MANDATORY)
- Phase 1: Core Logic (Console Todo)
- Phase 2: Web Application
- Phase 3: AI + MCP
- Phase 4: Kubernetes / Infrastructure
- Phase 5: Enterprise System

6. AGENT RULES
- Agents are decision-makers, not workers
- Agents do not store state
- Agents do not access databases
- Agents select MCP tools based on user intent
- Agent behavior must be documented in AGENTS.md

7. MCP RULES
- MCP servers are stateless tool boundaries between AI and business logic

## Response snapshot

Created constitution v1.0.0 with:
- 10 core principles governing spec-driven development and AI safety
- Mandatory project structure for 5-phase evolution
- Phase definitions with allowed/forbidden boundaries
- Agent and MCP rules ensuring safe AI integration
- Governance section with amendment procedures and versioning policy

Key architectural decisions encoded:
1. Specs before code (traceability)
2. Shared skills as single source of truth (no duplication)
3. AI acts only through MCP tools (safety boundary)
4. Phases are additive, not destructive (incremental delivery)

## Outcome

- ✅ Impact: HIGH - Established foundational governance for entire project lifecycle
- 🧪 Tests: N/A (governance document)
- 📁 Files: .specify/memory/constitution.md (created/updated)
- 🔁 Next prompts: /sp.specify for Phase 1 spec, create AGENTS.md, create project structure
- 🧠 Reflection: Constitution provides clear boundaries for AI safety (MCP-only), skill centralization, and phase progression

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All 10 principles documented with rationale
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Validate constitution compliance in first feature spec
