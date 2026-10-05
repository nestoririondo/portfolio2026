#!/usr/bin/env bash
# Redeploys the site through Dokploy when the deploy branch gets a new commit.
# Dokploy sits behind the firewall, so GitHub webhooks can't reach it; this
# polls GitHub from the server instead. Config: /etc/dokploy-poll.env
set -euo pipefail

: "${REPO_URL:?}" "${BRANCH:?}" "${APPLICATION_ID:?}" "${DOKPLOY_API_KEY:?}"
DOKPLOY_URL="${DOKPLOY_URL:-http://localhost:3000}"
STATE_FILE="${STATE_FILE:-/var/lib/dokploy-poll/last-sha}"

mkdir -p "$(dirname "$STATE_FILE")"

remote_sha="$(git ls-remote "$REPO_URL" "refs/heads/$BRANCH" | cut -f1)"
if [[ -z "$remote_sha" ]]; then
  echo "branch $BRANCH not found on $REPO_URL" >&2
  exit 1
fi

if [[ ! -f "$STATE_FILE" ]]; then
  echo "$remote_sha" > "$STATE_FILE"
  echo "first run, recorded $remote_sha without deploying"
  exit 0
fi

[[ "$remote_sha" == "$(cat "$STATE_FILE")" ]] && exit 0

curl -fsS -X POST "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $DOKPLOY_API_KEY" \
  -H "content-type: application/json" \
  -d "{\"applicationId\":\"$APPLICATION_ID\"}" > /dev/null

echo "$remote_sha" > "$STATE_FILE"
echo "deploy triggered for $remote_sha"
