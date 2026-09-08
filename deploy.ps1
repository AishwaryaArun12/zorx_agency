# One-shot: install, build, GitHub repo, Vercel production deploy
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path .git)) { git init -b main }

npm install
npm run build

git add -A
git status
$pending = git status --porcelain
if ($pending) {
  git commit -m "Add ZORX one-page agency site with scroll animations."
}

if (-not (git remote 2>$null)) {
  gh repo create zorx-agency --public --source=. --remote=origin --push
} else {
  git push -u origin HEAD
}

npx vercel --yes --prod
