
# Best Buy Review Program

A survey application that allows users to participate in the Best Buy Review Program for a chance to earn a gift card.

## Project info

**URL**: https://lovable.dev/projects/2198cdeb-3fad-4b75-94fc-4e1e044e3174

## Local Development

To run this project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Build for Production

```sh
# Build the project for production
npm run build

# Preview the production build locally
npm run preview
```

## Deploying to Netlify

### Option 1: Deploy from GitHub

1. In your Netlify account, click "New site from Git"
2. Select GitHub and authorize Netlify
3. Select this repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 2: Deploy manually

```sh
# Install Netlify CLI
npm install -g netlify-cli

# Build your site
npm run build

# Deploy to Netlify
netlify deploy
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
