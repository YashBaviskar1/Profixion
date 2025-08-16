# 📄 backend/README.md

# Backend Workflow

This branch is for **backend development only**.

---

## 🛠 Checkout & Setup

```bash
# Switch to backend branch
git checkout backend
git pull origin backend
```

## 💻 Day-to-Day Workflow

Make changes in the `/backend` folder only.

Stage, commit, and push:

```bash
git add .
git commit -m "describe your backend changes"
git push origin backend
```

## 🔗 Integration to Dev

When you are ready to test with frontend:

```bash
# Switch to dev branch
git checkout dev
git pull origin dev

# Merge backend changes into dev
git merge backend

# Push updated dev
git push origin dev
```

The dev branch now contains your latest backend + frontend work.
