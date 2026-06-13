# Git Push Guide for EmotiPitch

Complete step-by-step guide to push all your code to GitHub.

## 📋 Pre-Push Checklist

Before pushing, make sure you have:
- ✅ GitHub repository created: `https://github.com/i-m-samarth-cs/EmotiPitch`
- ✅ Git installed on your computer
- ✅ GitHub account logged in

## 🚀 Step-by-Step Push Commands

### Step 1: Initialize Git (if not already done)

```bash
# Navigate to your project directory
cd c:/Users/samar/Downloads/EmotiPitch

# Initialize git repository
git init

# Check git status
git status
```

### Step 2: Add All Files

```bash
# Add all files to staging
git add .

# Verify what will be committed
git status
```

### Step 3: Create Initial Commit

```bash
# Commit all files with a message
git commit -m "Complete EmotiPitch application with all features"
```

### Step 4: Add Remote Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/i-m-samarth-cs/EmotiPitch.git

# Verify remote was added
git remote -v
```

### Step 5: Push to GitHub

```bash
# Push to main branch (force push if needed)
git push -u origin main

# If main branch doesn't exist, try master
git branch -M main
git push -u origin main --force
```

## 🔧 Alternative: Complete Fresh Push

If you encounter any issues, use this complete sequence:

```bash
# 1. Navigate to project
cd c:/Users/samar/Downloads/EmotiPitch

# 2. Remove existing git (if any)
rm -rf .git

# 3. Initialize fresh git
git init

# 4. Add all files
git add .

# 5. Commit
git commit -m "Complete EmotiPitch: AI-powered emotion-driven tactical mirror with dark/light mode, logo integration, and enhanced camera detection"

# 6. Rename branch to main
git branch -M main

# 7. Add remote
git remote add origin https://github.com/i-m-samarth-cs/EmotiPitch.git

# 8. Push with force (overwrites existing)
git push -u origin main --force
```

## 📦 What Will Be Pushed

### Frontend Files (15 files)
- ✅ `frontend/package.json`
- ✅ `frontend/vite.config.js`
- ✅ `frontend/tailwind.config.js`
- ✅ `frontend/postcss.config.js`
- ✅ `frontend/index.html`
- ✅ `frontend/src/main.jsx`
- ✅ `frontend/src/App.jsx`
- ✅ `frontend/src/index.css`
- ✅ `frontend/src/context/ThemeContext.jsx`
- ✅ `frontend/src/components/Header.jsx`
- ✅ `frontend/src/components/Footer.jsx`
- ✅ `frontend/src/components/MatchWatcher.jsx`
- ✅ `frontend/src/components/EmotionBar.jsx`
- ✅ `frontend/src/components/AIExplanation.jsx`
- ✅ `frontend/src/components/CoachSimulation.jsx`
- ✅ `frontend/src/components/EmotionTacticMap.jsx`
- ✅ `frontend/public/logo.png`

### Backend Files (9 files)
- ✅ `backend/app.py`
- ✅ `backend/requirements.txt`
- ✅ `backend/.env.example`
- ✅ `backend/Dockerfile`
- ✅ `backend/routes/explain.py`
- ✅ `backend/routes/simulate.py`
- ✅ `backend/utils/granite_client.py`
- ✅ `backend/utils/langflow_orchestration.py`

### Documentation (6 files)
- ✅ `README.md`
- ✅ `deployment.md`
- ✅ `QUICKSTART.md`
- ✅ `PROJECT_SUMMARY.md`
- ✅ `TESTING_CHECKLIST.md`
- ✅ `IMPROVEMENTS_GUIDE.md`

### Configuration (4 files)
- ✅ `.gitignore`
- ✅ `vercel.json`
- ✅ `langflow/emotipitch_flow.json`
- ✅ `logo.png`

**Total: 35+ files**

## ✅ Verify Push Success

After pushing, verify on GitHub:

1. Go to: `https://github.com/i-m-samarth-cs/EmotiPitch`
2. Check that all folders are visible:
   - `frontend/`
   - `backend/`
   - `langflow/`
   - `README.md`
   - `logo.png`
3. Click on files to verify content

## 🔍 Troubleshooting

### Issue: "Permission denied"
```bash
# Use HTTPS with token or SSH
git remote set-url origin https://github.com/i-m-samarth-cs/EmotiPitch.git
```

### Issue: "Repository not found"
```bash
# Verify repository exists and you have access
# Check repository name spelling
git remote -v
```

### Issue: "Failed to push"
```bash
# Force push (overwrites remote)
git push -u origin main --force
```

### Issue: "Large files"
```bash
# Check file sizes
git ls-files -s | awk '{print $4, $2}' | sort -n -r | head -20

# Remove large files if needed
git rm --cached large-file.ext
git commit -m "Remove large file"
```

## 📝 Post-Push Commands

### Update README with correct links
After pushing, update these in README.md:
- Replace `yourusername` with `i-m-samarth-cs`
- Add live demo URL (after deployment)
- Add your email

### Create .gitignore (if not exists)
Already included, but verify it contains:
```
node_modules/
venv/
__pycache__/
.env
dist/
build/
*.pyc
.DS_Store
```

## 🎉 Success Confirmation

You'll know push succeeded when:
1. ✅ Terminal shows: "Branch 'main' set up to track remote branch 'main'"
2. ✅ GitHub repository shows all files
3. ✅ Commit count increases
4. ✅ README.md displays correctly on GitHub

## 🔄 Future Updates

To push future changes:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Description of changes"

# 4. Push
git push origin main
```

## 📞 Need Help?

If you encounter issues:
1. Check error message carefully
2. Verify repository URL is correct
3. Ensure you have push permissions
4. Try force push if safe to overwrite

---

**Ready to push? Run the commands in Step 5 above!** 🚀