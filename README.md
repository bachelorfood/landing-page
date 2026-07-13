# landing-page

A modern, responsive landing page for the Bachelor Food brand, focused on clear messaging, strong visual hierarchy, and conversion-friendly layout.

## About

landing-page is a frontend application built with React + TypeScript + Vite. It presents the Bachelor Food experience through a polished, performance-focused, and mobile-friendly landing page.

## Tech Stack

- React
- TypeScript
- Vite
- CSS

## Project Structure

```text
landing-page/
  src/
    components/
    App.tsx
    data.ts
    index.css
    main.tsx
    types.ts
  assets/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bachelorfood/landing-page.git
   cd landing-page
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

You can deploy this app to platforms like Vercel, Netlify, or GitHub Pages after running:

```bash
npm run build
```

## Git Setup and Push (First Time)

Run these commands inside the project root:

```bash
echo "# landing-page" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/bachelorfood/landing-page.git
git push -u origin main
```

If the remote already exists, update it with:

```bash
git remote set-url origin https://github.com/bachelorfood/landing-page.git
```

## Author

Jayakrishna
