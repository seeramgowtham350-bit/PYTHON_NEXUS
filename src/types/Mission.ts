export type TrackType = 'biotechnology' | 'materials_science' | 'foundations' | 'boss';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'boss';

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface Mission {
  id: string;
  levelId: number;
  title: string;
  track: TrackType;
  difficulty: DifficultyLevel;
  xpReward: number;
  storyline: string;
  scientificContext: {
    domain: 'Biotechnology' | 'Materials Science' | 'Core Computer Science';
    instrument: string;
    description: string;
    realWorldFormula?: string;
  };
  pythonTopic: string;
  conceptExplanation: string;
  exampleCode: string;
  challengeInstructions: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: TestCase[];
  locationId: string;
  unlockedByDefault?: boolean;
}

export interface Location {
  id: string;
  name: string;
  division: 'Biotechnology' | 'Materials Science' | 'Central Nexus';
  levelRequired: number;
  description: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on map
  color: string;
  icon: string;
  missionIds: string[];
}
