# Summary of Changes

## 1. Updated Footer Links
- **File**: `components/footer.tsx`
- **Changes**:
  - LinkedIn URL changed from `https://linkedin.com/in/cameronyking` to `https://www.linkedin.com/in/ashwinssj/`
  - GitHub URL changed from `https://github.com/cameronking4/github-repo-tavily-ai-search/tree/main` to `https://github.com/Ashwinssj/github-repo-tavily-ai-search`

## 2. Updated README.md
- **File**: `README.md`
- **Changes**:
  - Updated the image URL to point to Ashwinssj's repository
  - Updated the screenshot link in the Quickstart section to point to Ashwinssj's repository

## 3. Updated Vercel Deployment Guide
- **File**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **Changes**:
  - Updated the clone command to use the correct repository name: `github-repo-tavily-ai-search`
  - Updated the directory name after cloning to `github-repo-tavily-ai-search`

## 4. NVIDIA NIM Integration (Previously Completed)
- Created LLM wrapper in `lib/llm.ts`
- Updated all agent files (researcher, query-suggestor, task-manager, inquire, writer) to use the LLM wrapper
- Added NVIDIA NIM configuration to `.env.local.example` and created `.env.local`
- The application is currently running locally on http://localhost:3001 using NVIDIA NIM

## To Verify Changes
1. The footer should now display your LinkedIn and GitHub profiles
2. The README should show your repository's images and links
3. The Vercel deployment guide now uses the correct repository name

## Deployment Notes
When deploying to Vercel, ensure you set the following environment variables:
- `TAVILY_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NVIDIA_NIM_API_KEY`
- `NVIDIA_NIM_BASE_URL` = `https://integrate.api.nvidia.com/v1`
- `NVIDIA_NIM_MODEL` = `nvidia_nim/nvidia/nemotron-3-super-120b-a12b`
- `USE_NVIDIA_NIM` = `true`