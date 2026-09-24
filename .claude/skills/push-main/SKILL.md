---
name: push-main
description: Commit și push direct pe main. Folosește-l la orice commit/push în acest repo.
---

# push-main

1. Verifică branch-ul: `git branch --show-current`. Dacă nu e `main`, mută modificările pe `main` (`git stash`, `git checkout main`, `git stash pop`).
2. Sincronizează: `git pull --rebase origin main`.
3. Verifică ce intră: `git status` și `git diff`. Nu include fișiere temporare, secrete sau build-uri.
4. Commit cu un mesaj scurt și descriptiv: `git add <fișiere>`, apoi `git commit -m "..."`.
5. Push: `git push origin main`. La erori de rețea, reîncearcă de până la 4 ori (2s, 4s, 8s, 16s).
6. Nu crea branch-uri și PR-uri, și nu face force-push pe `main`.
