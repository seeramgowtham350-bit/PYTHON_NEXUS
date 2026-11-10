export type PlayerRank =
  | 'Python Rookie'
  | 'Code Explorer'
  | 'Junior Scientist'
  | 'Lab Engineer'
  | 'Bioinformatics Researcher'
  | 'Materials Scientist'
  | 'Computational Scientist'
  | 'Python Nexus Master';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'missions' | 'science' | 'streak' | 'boss' | 'mastery';
  xpReward: number;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface PlayerProfile {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  rank: PlayerRank;
  lives: number;
  maxLives: number;
  streakDays: number;
  lastActiveDate: string;
  completedMissionIds: string[];
  unlockedLocationIds: string[];
  unlockedLevelIds: number[];
  achievements: Achievement[];
  bossDefeated: boolean;
  totalCodeRuns: number;
  scientificSimulationsRun: number;
  savedPlaygroundCodes: {
    id: string;
    title: string;
    code: string;
    updatedAt: string;
  }[];
}
