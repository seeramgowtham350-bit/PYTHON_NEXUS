import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { PlayerProfile, Achievement } from '../types/Player';
import { Mission } from '../types/Mission';
import { loadPlayerProfile, savePlayerProfile } from '../utils/storage';
import { calculateRankAndLevel } from '../engine/xpManager';
import { soundEngine } from '../engine/soundEngine';
import { LEVEL_MODULES } from '../data/lessons';
import { NEXUS_LOCATIONS } from '../data/missions';

interface GameContextType {
  player: PlayerProfile;
  completeMission: (mission: Mission) => { newLevel: boolean; newRank: boolean; xpAwarded: number };
  awardXp: (amount: number, reason?: string) => void;
  loseLife: () => void;
  refillLives: () => void;
  updatePlayerName: (name: string) => void;
  updateAvatar: (avatar: string) => void;
  savePlaygroundCode: (title: string, code: string) => void;
  deletePlaygroundCode: (id: string) => void;
  novaMessage: string;
  setNovaMessage: (msg: string) => void;
  levelUpModal: { open: boolean; oldLevel: number; newLevel: number; rankTitle: string } | null;
  closeLevelUpModal: () => void;
  victoryModalOpen: boolean;
  setVictoryModalOpen: (open: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerProfile>(loadPlayerProfile);
  const [novaMessage, setNovaMessage] = useState<string>(
    'Greetings, Scientist. The Nexus research reactors have failed. Calibrate your Python terminal to restore the labs.'
  );
  const [levelUpModal, setLevelUpModal] = useState<{ open: boolean; oldLevel: number; newLevel: number; rankTitle: string } | null>(null);
  const [victoryModalOpen, setVictoryModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());

  // Keep state synced with localStorage
  useEffect(() => {
    savePlayerProfile(player);
  }, [player]);

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const closeLevelUpModal = () => {
    setLevelUpModal(null);
  };

  const awardXp = (amount: number, reason?: string) => {
    setPlayer(prev => {
      const newXp = prev.xp + amount;
      const { rank: newRank, level: newLevel } = calculateRankAndLevel(newXp);
      const isLevelUp = newLevel > prev.level;
      const isRankUp = newRank !== prev.rank;

      if (isLevelUp) {
        soundEngine.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F5FF', '#A855F7', '#39FF14', '#FF00E5'],
        });
        setLevelUpModal({
          open: true,
          oldLevel: prev.level,
          newLevel,
          rankTitle: newRank,
        });
        setNovaMessage(`Outstanding breakthrough! You've ascended to Level ${newLevel}: ${newRank}.`);
      }

      // Check level unlock thresholds
      const unlockedLevels = [...prev.unlockedLevelIds];
      LEVEL_MODULES.forEach(mod => {
        if (newXp >= mod.xpRequired && !unlockedLevels.includes(mod.levelId)) {
          unlockedLevels.push(mod.levelId);
        }
      });

      // Check location unlock thresholds
      const unlockedLocations = [...prev.unlockedLocationIds];
      NEXUS_LOCATIONS.forEach(loc => {
        if (unlockedLevels.includes(loc.levelRequired) && !unlockedLocations.includes(loc.id)) {
          unlockedLocations.push(loc.id);
        }
      });

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rank: newRank,
        unlockedLevelIds: unlockedLevels,
        unlockedLocationIds: unlockedLocations,
      };
    });
  };

  const completeMission = (mission: Mission) => {
    soundEngine.playSuccess();
    const isAlreadyCompleted = player.completedMissionIds.includes(mission.id);
    const xpReward = isAlreadyCompleted ? Math.round(mission.xpReward * 0.2) : mission.xpReward;

    let newLevelTriggered = false;
    let newRankTriggered = false;

    setPlayer(prev => {
      const newCompleted = isAlreadyCompleted
        ? prev.completedMissionIds
        : [...prev.completedMissionIds, mission.id];

      const newXp = prev.xp + xpReward;
      const { rank: newRank, level: newLevel } = calculateRankAndLevel(newXp);
      newLevelTriggered = newLevel > prev.level;
      newRankTriggered = newRank !== prev.rank;

      // Update achievements
      const updatedAchievements: Achievement[] = prev.achievements.map(ach => {
        let prog = ach.progress || 0;
        if (ach.id === 'first_syntax') {
          prog = 1;
        } else if (ach.id === 'dna_decoder' && mission.track === 'biotechnology') {
          prog = Math.min((ach.maxProgress || 3), prog + 1);
        } else if (ach.id === 'material_master' && mission.track === 'materials_science') {
          prog = Math.min((ach.maxProgress || 3), prog + 1);
        } else if (ach.id === 'core_restorer' && mission.id === 'boss_core') {
          prog = 1;
        }
        return {
          ...ach,
          progress: prog,
          unlockedAt: prog >= (ach.maxProgress || 1) ? (ach.unlockedAt || new Date().toISOString()) : undefined,
        };
      });

      // Check unlocked levels and locations
      const unlockedLevels = [...prev.unlockedLevelIds];
      LEVEL_MODULES.forEach(mod => {
        if (newXp >= mod.xpRequired && !unlockedLevels.includes(mod.levelId)) {
          unlockedLevels.push(mod.levelId);
        }
      });

      const unlockedLocations = [...prev.unlockedLocationIds];
      NEXUS_LOCATIONS.forEach(loc => {
        if (unlockedLevels.includes(loc.levelRequired) && !unlockedLocations.includes(loc.id)) {
          unlockedLocations.push(loc.id);
        }
      });

      const bossBeat = mission.id === 'boss_core' ? true : prev.bossDefeated;
      if (mission.id === 'boss_core') {
        setVictoryModalOpen(true);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rank: newRank,
        completedMissionIds: newCompleted,
        unlockedLevelIds: unlockedLevels,
        unlockedLocationIds: unlockedLocations,
        achievements: updatedAchievements,
        bossDefeated: bossBeat,
        totalCodeRuns: prev.totalCodeRuns + 1,
      };
    });

    if (newLevelTriggered) {
      soundEngine.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F5FF', '#A855F7', '#39FF14'],
      });
      const { rank: nextRank, level: nextLevel } = calculateRankAndLevel(player.xp + xpReward);
      setLevelUpModal({
        open: true,
        oldLevel: player.level,
        newLevel: nextLevel,
        rankTitle: nextRank,
      });
    }

    setNovaMessage(`Mission "${mission.title}" calibrated successfully! +${xpReward} XP awarded.`);

    return {
      newLevel: newLevelTriggered,
      newRank: newRankTriggered,
      xpAwarded: xpReward,
    };
  };

  const loseLife = () => {
    soundEngine.playError();
    setPlayer(prev => {
      const remaining = Math.max(0, prev.lives - 1);
      return { ...prev, lives: remaining };
    });
    setNovaMessage('Calibration anomaly detected. Check your test case mismatches or syntax.');
  };

  const refillLives = () => {
    soundEngine.playSuccess();
    setPlayer(prev => ({ ...prev, lives: prev.maxLives }));
    setNovaMessage('Quantum bio-shields fully recharged. All 5 lives restored.');
  };

  const updatePlayerName = (name: string) => {
    setPlayer(prev => ({ ...prev, name }));
  };

  const updateAvatar = (avatar: string) => {
    setPlayer(prev => ({ ...prev, avatar }));
  };

  const savePlaygroundCode = (title: string, code: string) => {
    setPlayer(prev => {
      const existing = prev.savedPlaygroundCodes.findIndex(p => p.title === title);
      let updatedList = [...prev.savedPlaygroundCodes];
      if (existing >= 0) {
        updatedList[existing] = {
          ...updatedList[existing],
          code,
          updatedAt: new Date().toISOString(),
        };
      } else {
        updatedList.push({
          id: 'code_' + Date.now(),
          title,
          code,
          updatedAt: new Date().toISOString(),
        });
      }
      return { ...prev, savedPlaygroundCodes: updatedList };
    });
    setNovaMessage(`Saved laboratory program: "${title}" to local quantum drive.`);
  };

  const deletePlaygroundCode = (id: string) => {
    setPlayer(prev => ({
      ...prev,
      savedPlaygroundCodes: prev.savedPlaygroundCodes.filter(p => p.id !== id),
    }));
  };

  const resetProgress = () => {
    localStorage.removeItem('python_nexus_player_state_v1');
    window.location.reload();
  };

  return (
    <GameContext.Provider
      value={{
        player,
        completeMission,
        awardXp,
        loseLife,
        refillLives,
        updatePlayerName,
        updateAvatar,
        savePlaygroundCode,
        deletePlaygroundCode,
        novaMessage,
        setNovaMessage,
        levelUpModal,
        closeLevelUpModal,
        victoryModalOpen,
        setVictoryModalOpen,
        isMuted,
        toggleMute,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
