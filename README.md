# Python Nexus – A Neon Science Coding Game

### Code. Discover. Experiment. Evolve.

**Python Nexus** is a gamified educational web application teaching Python programming from absolute beginner level to intermediate and scientific computing through an immersive futuristic **Biotechnology** and **Materials Science** laboratory narrative.

---

## 🔬 Key Highlights

- **100% In-Browser Execution**: Powered by Pyodide (WebAssembly), executing real Python 3.12 directly inside the user's browser. Zero external terminal, Python installation, or command prompt required.
- **Embedded Monaco Code Editor**: Professional-grade code editor featuring custom neon cyberpunk syntax theme, line numbers, automatic bracket matching, code reset, and copying.
- **Biotechnology Universe**: 18+ genomic and microbial missions covering DNA base counting, Wallace melting temperature ($T_m$), bacterial doubling kinetics, restriction enzyme cleavage, and GC-content sliding windows.
- **Materials Science Universe**: 18+ physical and mechanical missions covering alloy density, Hooke's Law elastic modulus ($E = \sigma / \varepsilon$), Czochralski furnace trip logic, cubic crystal unit cell volume ($V = a^3$), and multiaxial stress tensors.
- **Gamified Progression Engine**: 8 Player Ranks, XP rewards, laboratory bio-shields/lives, daily research streaks, unlockable facilities, level-up fanfares, and celebratory particle effects.
- **The Nexus Core Failure (Final Boss)**: Climax mission requiring multi-system diagnostic restoration to save the research universe, awarding a printable Certificate of Research Mastery.
- **Python Playground**: Freeform sandbox with standard libraries, template library, file import/export (.py), and LocalStorage persistence.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Bundler & Build**: Vite
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Python Runtime**: Pyodide WebAssembly (Python 3.12)
- **Audio Engine**: Procedural Web Audio API Synthesizer (Zero MP3 dependencies)
- **Visual FX**: Canvas Confetti & Lucide React
- **Data Persistence**: Browser LocalStorage

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/python-nexus.git

# Enter project directory
cd python-nexus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

The project includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

To deploy:
1. Push this repository to GitHub.
2. In your repository settings, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Pushing to the `main` branch will automatically build and publish the site.

---

## 📜 License
MIT License. Created for interactive scientific computing education.
