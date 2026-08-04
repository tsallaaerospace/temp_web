# Project Rules for AI Assistants

## Mandatory Change Logging & Code Preservation Rules

### 1. Change Logging (`PROJECT_CHANGELOG.md`)
- For every prompt/chat in this repository, you **MUST** document all changes in `PROJECT_CHANGELOG.md` at the project root (`c:\Users\tsall\Desktop\1st_version\PROJECT_CHANGELOG.md`).
- **Page & Section Breakdown Format**: Always structure changes clearly under the relevant Page (e.g., `Home Page (/)`) and specific Section (e.g., `Section 1: Top Navigation Bar`, `Section 2: Hero Section`, `Section 7: Footer Section`, etc.).
- **Before UI vs After UI Detail**: Every section change MUST document:
  - ⏮️ **BEFORE UI STATE**: Exactly how the component/layout looked and behaved before the prompt.
  - ⏭️ **AFTER UI STATE**: Exactly how the component/layout looks and behaves after the prompt.

### 2. Code Preservation in Source Files (Never Delete Code)
- **DO NOT DELETE lines of code** when modifying files.
- **Always comment out** previous code blocks (e.g., `{/* PREVIOUS UI: ... */}` or `// PREVIOUS UI: ...`) directly in the source file so that previous UI states can easily be restored if requested by the user in future chats.
