# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/12a7eb39-a3a4-4afc-a9b5-c73842865678

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/12a7eb39-a3a4-4afc-a9b5-c73842865678) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

GitHub Actions deploys the site to GitHub Pages automatically every time `main` is updated. No manual steps are required once the workflow succeeds.

1. Push your changes to `main`.
2. Watch the **Deploy to GitHub Pages** workflow under the **Actions** tab.
3. Once it finishes, GitHub Pages serves the content from the generated `dist` bundle.

To force a re-deploy without new commits, use the **Run workflow** button on the workflow page.

## Can I use a custom domain?

Yes! Update `public/CNAME` with your domain and point the domain's DNS records to GitHub Pages. The deployment pipeline automatically copies the CNAME file into the published site. After DNS propagates, set the custom domain under **Settings → Pages** in GitHub.
