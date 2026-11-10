import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NovaAssistant } from './components/layout/NovaAssistant';
import { LevelUpModal } from './components/game/LevelUpModal';
import { VictoryModal } from './components/game/VictoryModal';

import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LearningPath } from './pages/LearningPath';
import { MissionPage } from './pages/MissionPage';
import { PythonPlayground } from './pages/PythonPlayground';
import { ScienceMap } from './pages/ScienceMap';
import { Achievements } from './pages/Achievements';
import { Profile } from './pages/Profile';

export default function App() {
  // Using HashRouter ensures seamless routing in AI Studio iframe and GitHub Pages
  return (
    <HashRouter>
      <GameProvider>
        <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans selection:bg-[#00F5FF]/30 selection:text-[#00F5FF]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/missions" element={<LearningPath />} />
              <Route path="/mission/:missionId" element={<MissionPage />} />
              <Route path="/playground" element={<PythonPlayground />} />
              <Route path="/map" element={<ScienceMap />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <NovaAssistant />
          <LevelUpModal />
          <VictoryModal />
        </div>
      </GameProvider>
    </HashRouter>
  );
}
