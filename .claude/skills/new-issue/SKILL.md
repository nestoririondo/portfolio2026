---
name: new-issue
description: Turn a topic, idea, or bug into a well-structured GitHub issue in this repo. Use whenever the user wants to capture, file, track, or "make an issue" out of something — including plain natural-language phrasing like "we should track X", "log a bug for Y", or "create an issue for Z". Invokable explicitly as /new-issue <topic>.
---

# new-issue

Turn a short topic from the user into a properly structured GitHub issue in `nestoririondo/portfolio2026`, filed via `gh issue create`.

## When to use

- The user explicitly runs `/new-issue <topic>`.
- The user asks to "create / file / open / make / log / track" an issue.
- The user describes a bug, idea, or task they clearly want captured for later rather than fixed right now.

## Disambiguation

If the user states a problem without saying what to do with it (e.g. "the footer links are broken"), and it's not obvious they want it filed vs. fixed now, ask one short question: **file as issue, or fix now?** Don't guess. If they're mid-task on something else, lean toward asking.

## How to write the issue

1. **Expand the topic into a real issue** — never file a one-line dump.
2. **Title**: concise, specific, imperative or descriptive. No trailing period.
3. **Body** (Markdown), using the structure below. Omit a section if it genuinely doesn't apply.
   ```
   ## Context
   One or two sentences on what this is and why it matters.

   ## Details
   The substance — what's happening, what's wanted, relevant files/components if known.

   ## Acceptance criteria
   - [ ] Concrete, checkable outcomes
   - [ ] Phrased as done-states, not tasks
   ```
4. **Voice**: outcome-not-output, scannable, not text-heavy. German content uses **du**-Ansprache (matches the portfolio's copy voice). Keep it tight.
5. **Labels**: pick from the repo's existing labels. The current set is:
   `bug`, `documentation`, `duplicate`, `enhancement`, `good first issue`, `help wanted`, `invalid`, `question`, `wontfix`.
   - Bug report → `bug`. New feature/improvement → `enhancement`. Docs → `documentation`. Open question → `question`.
   - Create a new label only if none fit and one clearly should exist — confirm with the user first.

## Flow

1. Draft the title, body, and labels.
2. **Show the draft to the user and confirm** before filing. (Skip the confirm only if the user said something like "just file it" / "no need to confirm".)
3. File it:
   ```bash
   gh issue create --title "TITLE" --body "BODY" --label "label1,label2"
   ```
   Write a multi-line body to a temp file and use `--body-file` if it's long, to avoid shell-escaping issues.
4. Return the issue URL that `gh` prints.

## Notes

- Repo is already determined by the working directory; no need to pass `--repo`.
- `gh` is authed as `nestoririondo`. If a command fails on auth, surface it rather than retrying blindly.
