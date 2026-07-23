# Deploying Media Levelling to Cloudflare Pages (`media-levelling.com`)

Since you bought `media-levelling.com` directly on Cloudflare, deploying your site is fast, free, and straightforward.

---

## Part 1: Frontend Deployment (Cloudflare Pages)

### Method A: Automatic Deployment via Git (Recommended)

1. **Push your code to GitHub / GitLab**:
   Ensure your repository is up to date on GitHub.

2. **Log into Cloudflare**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com).
   - Click **Workers & Pages** in the left sidebar menu.
   - Click **Create application** -> select **Pages** -> **Connect to Git**.

3. **Configure Project Settings**:
   - **Project Name**: `media-levelling`
   - **Production Branch**: `main` (or `master`)
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`

4. Click **Save and Deploy**.

---

### Method B: Direct CLI Deployment (Using Wrangler)

If you prefer to deploy directly from your command prompt without GitHub:

1. Build the production files:
   ```bash
   cmd /c npm run build
   ```

2. Deploy using Cloudflare's official CLI (`wrangler`):
   ```bash
   npx wrangler pages deploy dist --project-name=media-levelling
   ```
3. Follow the CLI prompt to authorize Cloudflare in your browser.

---

## Part 2: Connect your Domain (`media-levelling.com`)

Because `media-levelling.com` was purchased through Cloudflare Registrar:

1. In Cloudflare Dashboard, navigate to **Workers & Pages** > **media-levelling**.
2. Select the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter `media-levelling.com` and click **Continue**.
5. Cloudflare will automatically handle DNS records (CNAME setup) and issue your SSL certificate with **1-click confirmation**.
6. (Optional) Repeat the process for `www.media-levelling.com`.

---

## Part 3: Backend API Server (`server/server.js`) Setup

Your project has a Node.js / Express backend (`server/server.js`) handling orders, blog posts, and admin tasks.

### Deploying Backend on Render.com (Free Tier):
1. Sign up on [render.com](https://render.com).
2. Click **New +** -> **Web Service** and connect your repository.
3. Set the following settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`
   - **Environment Variables**:
     - `MONGODB_URI`: (Optional) your MongoDB connection string.
     - `ADMIN_PASSWORD`: Your secret admin panel password.
4. Copy your live backend URL (e.g., `https://media-levelling-api.onrender.com`).

### Connect Backend to Cloudflare Pages:
In your project's `public/_redirects` file, add your backend URL at the top:

```text
# Proxy API requests to backend
/api/*  https://media-levelling-api.onrender.com/api/:splat  200

# SPA Routing Fallback
/*      /index.html                                          200
```

When you redeploy, all `/api/*` requests on `https://media-levelling.com` will automatically proxy to your backend server!
