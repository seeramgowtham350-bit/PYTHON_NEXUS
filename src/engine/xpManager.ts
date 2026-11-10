import { PlayerRank } from '../types/Player';

export const RANK_THRESHOLDS: { rank: PlayerRank; minXp: number; level: number }[] = [
  { rank: 'Python Rookie', minXp: 0, level: 1 },
  { rank: 'Code Explorer', minXp: 150, level: 2 },
  { rank: 'Junior Scientist', minXp: 400, level: 3 },
  { rank: 'Lab Engineer', minXp: 800, level: 4 },
  { rank: 'Bioinformatics Researcher', minXp: 1300, level: 5 },
  { rank: 'Materials Scientist', minXp: 1900, level: 6 },
  { rank: 'Computational Scientist', minXp: 2600, level: 7 },
  { rank: 'Python Nexus Master', minXp: 3500, level: 8 },
];

export function calculateRankAndLevel(xp: number): { rank: PlayerRank; level: number; nextLevelXp: number; progressPercent: number } {
  let currentRank: PlayerRank = 'Python Rookie';
  let currentLevel = 1;
  let nextLevelXp = RANK_THRESHOLDS[1].minXp;
  let currentLevelBase = 0;

  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= RANK_THRESHOLDS[i].minXp) {
      currentRank = RANK_THRESHOLDS[i].rank;
      currentLevel = RANK_THRESHOLDS[i].level;
      currentLevelBase = RANK_THRESHOLDS[i].minXp;
      nextLevelXp = i < RANK_THRESHOLDS.length - 1 ? RANK_THRESHOLDS[i + 1].minXp : RANK_THRESHOLDS[i].minXp + 1000;
      break;
    }
  }

  const denominator = Math.max(1, nextLevelXp - currentLevelBase);
  const progressPercent = Math.min(100, Math.max(0, Math.round(((xp - currentLevelBase) / denominator) * 100)));

  return {
    rank: currentRank,
    level: currentLevel,
    nextLevelXp,
    progressPercent,
  };
}

export function getXpRewardForDifficulty(difficulty: 'easy' | 'medium' | 'hard' | 'boss'): number {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 25;
    case 'hard':
      return 50;
    case 'boss':
      return 250;
    default:
      return 20;
  }
}
