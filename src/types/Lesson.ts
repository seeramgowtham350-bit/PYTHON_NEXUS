import { Mission } from './Mission';

export interface LevelModule {
  levelId: number;
  title: string;
  subtitle: string;
  division: 'Foundations' | 'Biotechnology' | 'Materials Science' | 'Scientific Computing' | 'Nexus Core' | 'Central Nexus';
  description: string;
  topics: string[];
  missions: Mission[];
  xpRequired: number;
  levelRequired?: number;
  badge: {
    name: string;
    icon: string;
    color: string;
  };
}
