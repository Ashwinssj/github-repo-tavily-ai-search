# Deploying Tavily AI Search on Vercel

This guide explains how to deploy the Tavily AI Search application (modified to use NVIDIA NIM) on Vercel.

## Prerequisites

- A Vercel account (https://vercel.com/signup)
- Vercel CLI installed (`npm i -g vercel`) – optional but helpful
- Required API keys:
  - **NVIDIA NIM API Key** (from https://api.nvidia.com/)
  - **Tavily API Key** (from https://app.tavily.com/)
  - **Upstash Redis URL and Token** (from https://upstash.com/redis)

## Step-by-Step Deployment

### 1. Fork / Clone the Repository

If you haven't already, fork this repository to your GitHub account, then clone it locally:

```bash
git clone https://github.com/<your-username>/github-repo-tavily-ai-search.git
cd github-repo-tavily-ai-search
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Production Build (Optional Local Test)

```bash
npm run build
npm run start
```

Verify the app runs correctly locally on http://localhost:3000.

### 4. Push to GitHub (if not already)

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 5. Import Project to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard and click **New Project**.
2. Import your GitHub repository (`tavily-ai-search`).
3. Vercel will automatically detect it's a Next.js app.

#### Option B: Using Vercel CLI

```bash
vercel
```
Follow the prompts (link to GitHub repo, etc.).

### 6. Configure Environment Variables

In the Vercel project dashboard, go to **Settings → Environment Variables** and add the following:

| Key | Value | Environment |
|-----|-------|-------------|
| `TAVILY_API_KEY` | Your Tavily API key | Production (and Preview if desired) |
| `UPSTASH_REDIS_REST_URL` | Your Upstash Redis REST URL | Production |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash Redis REST token | Production |
| `NVIDIA_NIM_API_KEY` | Your NVIDIA NIM API key | Production |
| `NVIDIA_NIM_BASE_URL` | `https://integrate.api.nvidia.com/v1` | Production |
| `NVIDIA_NIM_MODEL` | `nvidia_nim/nvidia/nemotron-3-super-120b-a12b` | Production |
| `USE_NVIDIA_NIM` | `true` | Production |

> **Note**: Do **not** expose your API keys in the repository. Vercel encrypts environment variables.

### 7. Build & Deploy

Vercel will automatically build and deploy the project. Monitor the build logs for any issues.

- **Build Command**: `next build`
- **Output Directory**: `.next` (default for Next.js)
- **Install Command**: `npm install`

### 8. Verify Deployment

Once deployment succeeds, visit the assigned Vercel URL (e.g., `https://tavily-ai-search.vercel.app`) and test the search functionality.

## Troubleshooting

### Common Issues

- **Missing Environment Variables**: Double-check that all required variables are set in the Vercel project settings.
- **NVIDIA NIM API Errors**: Ensure your NVIDIA NIM API key is valid and has access to the model `nvidia/nemotron-3-super-120b-a12b`.
- **Upstash Connection**: Verify the Redis URL and token are correct.
- **Build Failures**: Check the Vercel build logs for dependency or Next.js errors.

### Logs

You can view deployment logs in the Vercel dashboard under **Deployments → [latest deployment] → Logs**.

## Updating the Deployment

After pushing changes to your GitHub main branch, Vercel will automatically trigger a new deployment (if you have the Git integration enabled). You can also manually trigger redeploys from the dashboard.

## Additional Notes

- The application uses Next.js 14 with the App Router.
- The NVIDIA NIM integration is handled via a wrapper in `lib/llm.ts` that switches providers based on the `USE_NVIDIA_NIM` flag.
- No changes to the Vercel platform configuration are required beyond setting the environment variables.

---

### Example `.env.local` (for local development only – **never commit this**)

```env
TAVILY_API_KEY=tvly-dev-your_tavily_key_here
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
NVIDIA_NIM_API_KEY=nvapi-your_nvidia_key_here
NVIDIA_NIM_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_NIM_MODEL=nvidia_nim/nvidia/nemotron-3-super-120b-a12b
USE_NVIDIA_NIM=true
```

Add this file locally for development, but ensure `.env.local` is listed in `.gitignore` (it already is).

Happy searching! 🚀