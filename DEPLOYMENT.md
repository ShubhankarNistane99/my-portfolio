# Deploying to Vercel via GitHub

This project is fully configured for continuous deployment on **Vercel** with Vite, Tailwind CSS, and automated single-page resume generation.

---

## Step 1: Push Code to Your GitHub Repository

If you haven't pushed this code to your GitHub account yet, run these commands in your project terminal:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files to staging
git add .

# 3. Commit changes
git commit -m "feat: initial commit of personal portfolio and resume"

# 4. Set the default branch to main
git branch -M main

# 5. Add your remote repository on GitHub
# (Create a new empty repository at https://github.com/new named 'portfolio' or similar)
git remote add origin https://github.com/ShubhankarNistane99/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

---

## Step 2: Connect and Deploy on Vercel

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.

2. **Add New Project**:
   - Click the **"Add New..."** button in your Vercel Dashboard and select **"Project"**.
   - Under **"Import Git Repository"**, find your repository (e.g. `ShubhankarNistane99/<your-repo-name>`) and click **"Import"**.

3. **Confirm Build & Output Settings**:
   Vercel automatically detects the `vercel.json` file in this repository:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click the blue **"Deploy"** button.
   - Vercel will install dependencies, generate the high-resolution single-page PDF resume, bundle the app with Vite, and deploy your site in ~30 seconds.

---

## Step 3: Your Live Web App

Once the deployment completes:
- You will receive a production URL such as:
  `https://<your-repo-name>.vercel.app`
- Every future `git push` to your `main` branch will automatically trigger a new deployment and update your live website.

---

## Step 4 (Optional): Add Custom Domain

If you own a custom domain (e.g. `shubhankarnistane.com` or `shubhankar.dev`):
1. In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
2. Enter your domain name and click **Add**.
3. Follow the DNS records instructions (CNAME or A records) provided by Vercel in your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.).
4. Vercel provisions free automatic SSL certificates (HTTPS) within minutes.
