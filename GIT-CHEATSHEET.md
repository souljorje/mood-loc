# GIT CHEAT SHEET FOR PRODUCT WORK

## MENTAL MODEL

Git = game saves

* commit → save point
* branch → separate playthrough
* merge → combine progress
* conflict → two outcomes → you choose

---

# COMMITS

## Rules

* keep small
* do often
* name descriptive: what changed

## YES

`feat(navbar): add dropdown`

## NO

`fix`, `asd`, `final-final-v2`

## Commands

Simple commit

```bash
git commit -m "feat(navbar): add dropdown menu"
```

Multiline commit (great for PR)

```bash
git commit -m "feat(navbar): add dropdown menu" \
           -m "Add reusable component" \
           -m "Animated and responsive"
```

## AI

* “split my changes into commits”
* “write commit message in Conventional Commits style”
* add an agent skill / rule for commit messages

## Read

* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

---

# BRANCHES

## Rules

* create from `main`
* one branch = one feature
* delete after merge

## YES

`feat/navbar`, `fix/button-alignment`

## NO

`my-branch`, `navbar-footer-everything`

## Commands

| Action | Command                             |
| ------ | ----------------------------------- |
| Create | `git switch -c feat/your-task`   |
| Switch | `git switch main`                   |
| Delete | `git branch -d feat/your-task`   |

## AI

* “suggest branch name”
* “split changes to multiple independent feature branches”

---

# PULL REQUESTS

In a good PR, title, description, commits, and attachments help the reviewer understand it

## Rules

* small and focused
* sync with `main` before opening
* title follows commit style
* description: what and why changed
* use draft if not ready

## YES

`feat(navbar): add dropdown menu`

* Added reusable component
* Reused existing appearance animation
* Closes [task-123](jira.com/task-123)
* Tested on desktop and mobile

## NO

`update menu.jsx`
No description (worst option)
or
`implemented task-123`

## AI

* “write PR title and description from commits”
* “merge main and open a draft PR”

---

# SYNCING

Stay on the same page with the team

## Rules

* start work with pull from `main`
* regularly merge `main` into your branch

## Commands

Update main

```bash
git checkout main && git pull
```

Sync branch

```bash
git checkout feat/your-task && git merge main
```

## AI

* “sync branch with main”
* “I got conflicts on each sync, how to avoid?”

## Tips

* enable auto-fetch in GUI if available

## Read

* [https://dev.to/budiwidhiyanto/the-art-of-pull-requests-a-developers-guide-to-smooth-code-reviews-38bk](https://dev.to/budiwidhiyanto/the-art-of-pull-requests-a-developers-guide-to-smooth-code-reviews-38bk)

---

# CONFLICTS

One navigator tells to go straight, another to turn right. You decide.

Same when two branches are merging:

* same line / region changed in both
* one deletes or renames a file, another modifies it

## Steps

1. Git shows options

```text
<<<<<<< HEAD
your code (to the left)
=======
incoming code (to the right)
>>>>>>> main
```

2. You choose right ones (or combine)
3. Remove markers (`<<<`, `===`, `>>>`)
4. Save

## AI

* “Let’s plan conflict resolve”
* “Keep both changes and merge cleanly”
* “Break code into components to avoid conflicts”

## Tips

* small branches → fewer conflicts
* modular code → fewer overlaps

---

# RECOVERY

Most mistakes are fixable, don’t panic

## Rules

* changes are pushed (shared) → `revert`
* changes are local (not shared) → `reset` / `amend`
* unsure → `revert`
* want people to hate you → `reset` + force push

## Commands

| Situation                   | Command                     | Notes                              |
| --------------------------- | --------------------------- | ---------------------------------- |
| Undo uncommitted changes    | `git restore <filename>`    | discard file changes, keep staging |
| Undo commit safely          | `git revert <commit>`       | discard changes, create new commit |
| Fix last commit             | `git commit --amend`        | edit message, add/remove files     |
| Go back, keep changes       | `git reset --soft <commit>` | move back, keep changes            |
| Go back, discard changes ⚠️ | `git reset --hard <commit>` | delete changes permanently         |

## AI

* “I messed up, what’s safest fix?”
* “Which command should I use here?”

---

# ROUTINE

## Start

* pull `main`
* sync existing branches
* check open PRs
* create new branch

## Work

* commit often
* keep branch synced

## Share

* open pull request
* describe changes clearly
* notify the team

## Cleanup

* delete branch
* celebrate 🎉

---

# GOLDEN RULES

* don’t work in `main`
* one branch = one feature
* commit often
* sync regularly
* make focused, well-described PRs
* don’t force push shared branches