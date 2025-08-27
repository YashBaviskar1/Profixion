# 📄 frontend/README.md

# Frontend Workflow

This branch is for **frontend development only**.

---

## 🛠 Checkout & Setup

```bash
# Switch to frontend branch
git checkout frontend
git pull origin frontend
```

## 💻 Day-to-Day Workflow

Make changes in the `/frontend` folder only.

Stage, commit, and push:

```bash
git add .
git commit -m "describe your frontend changes"
git push origin frontend
```

## 🔗 Integration to Dev

When you are ready to test with backend:

```bash
# Switch to dev branch
git checkout dev
git pull origin dev

# Merge frontend changes into dev
git merge frontend

# Push updated dev
git push origin dev
```

The dev branch now contains your latest frontend + backend work.

---
