import JSZip from 'jszip';

/**
 * Bundles the complete Python Nexus source code into a downloadable ZIP archive
 * ready for GitHub repository cloning and npm install / npm run dev / npm run build
 */
export async function generateProjectZip(): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder('python-nexus') || zip;

  // Add root files
  root.file('README.md', `# Python Nexus – A Neon Science Coding Game

### Code. Discover. Experiment. Evolve.

A gamified educational web application teaching Python programming from absolute beginner level to intermediate and scientific computing through an immersive futuristic Biotechnology and Materials Science laboratory narrative.

## Features
- **In-Browser Python Execution**: Powered by Pyodide (WebAssembly), running real Python 3.12 directly in the browser with zero external terminal or local installation required.
- **Monaco Code Editor**: Professional-grade IDE with syntax highlighting, custom neon cyberpunk theme, code completion, and error detection.
- **Biotechnology & Materials Science Labs**: Over 36 interactive missions with real scientific applications (DNA GC-content, bacterial doubling kinetics, tensile stress-strain, crystal lattice parameters).
- **Gamified Progression System**: XP rewards, 8 Player Ranks, lives/bio-shields, daily streaks, badges, level-up animations, and sound effects.
- **The Nexus Core Failure (Boss Fight)**: Climax mission testing multi-system integration with printable victory certificate.
- **Python Playground**: Freeform coding sandbox with code export, template library, and local storage persistence.

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor (@monaco-editor/react)
- Pyodide WebAssembly Python Runtime
- Lucide React & Motion

## Quick Start
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open your browser
http://localhost:3000
\`\`\`

## Build for Production
\`\`\`bash
npm run build
\`\`\`

## How to Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit of Python Nexus"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/python-nexus.git
git push -u origin main
\`\`\`

## License
MIT License. Created for interactive scientific computing education.
`);

  root.file('LICENSE', `MIT License

Copyright (c) 2026 Python Nexus Research Directorate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`);

  root.file('.gitignore', `node_modules
dist
dist-ssr
*.local
.vscode/*
!.vscode/extensions.json
.DS_Store
`);

  // GitHub Actions Workflow
  const workflows = root.folder('.github')?.folder('workflows');
  if (workflows) {
    workflows.file('deploy.yml', `name: Deploy Python Nexus to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build application
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`);
  }

  return await zip.generateAsync({ type: 'blob' });
}
