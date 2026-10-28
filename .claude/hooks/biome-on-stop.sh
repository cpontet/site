#!/usr/bin/env bash
# Stop hook: format + lint with Biome whenever Claude finishes a turn.
# Auto-fixes what it can; if errors remain, exit 2 so Claude gets the report and fixes them.
input=$(cat)
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
[ -f biome.json ] && [ -d node_modules/@biomejs ] || exit 0

if out=$(bunx biome check --write --colors=off --diagnostic-level=error . 2>&1); then
  exit 0
fi

# Second pass after Claude already reacted to this hook: don't loop, just warn the user.
if [ "$(jq -r '.stop_hook_active // false' <<<"$input")" = "true" ]; then
  jq -n --arg msg "Biome still reports errors — run 'bun run lint' to see them." '{systemMessage: $msg}'
  exit 0
fi

printf 'Biome found errors it could not fix automatically. Fix them:\n\n%s\n' "$(tail -n 60 <<<"$out")" >&2
exit 2
