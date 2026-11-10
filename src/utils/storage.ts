import { PlayerProfile } from '../types/Player';
import { calculateRankAndLevel } from '../engine/xpManager';

const STORAGE_KEY = 'python_nexus_player_state_v1';

export const INITIAL_PLAYER_PROFILE: PlayerProfile = {
  name: 'Novice Scientist',
  avatar: 'dna_quantum',
  xp: 0,
  level: 1,
  rank: 'Python Rookie',
  lives: 5,
  maxLives: 5,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedMissionIds: [],
  unlockedLocationIds: ['training_station'],
  unlockedLevelIds: [1],
  achievements: [
    {
      id: 'first_syntax',
      title: 'First Quantum Pulse',
      description: 'Execute your first verified Python line in the laboratory.',
      icon: 'Zap',
      category: 'mastery',
      xpReward: 50,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'dna_decoder',
      title: 'Genome Decrypter',
      description: 'Complete 3 Biotechnology laboratory missions.',
      icon: 'Dna',
      category: 'science',
      xpReward: 100,
      progress: 0,
      maxProgress: 3,
    },
    {
      id: 'material_master',
      title: 'Nanomaterial Forge',
      description: 'Complete 3 Materials Science laboratory missions.',
      icon: 'Layers',
      category: 'science',
      xpReward: 100,
      progress: 0,
      maxProgress: 3,
    },
    {
      id: 'streak_pioneer',
      title: 'Resilient Researcher',
      description: 'Maintain a 3-day research activity streak.',
      icon: 'Flame',
      category: 'streak',
      xpReward: 150,
      progress: 1,
      maxProgress: 3,
    },
    {
      id: 'core_restorer',
      title: 'Nexus Master',
      description: 'Defeat the Nexus Core Failure and restore the research universe.',
      icon: 'ShieldAlert',
      category: 'boss',
      xpReward: 500,
      progress: 0,
      maxProgress: 1,
    },
  ],
  bossDefeated: false,
  totalCodeRuns: 0,
  scientificSimulationsRun: 0,
  savedPlaygroundCodes: [
    {
      id: 'template_welcome',
      title: '1. Welcome to Python Nexus',
      code: `# Welcome to Python Nexus Playground!
print("--- [ PYTHON NEXUS TERMINAL ] ---")
print("Biotechnology & Materials Science Sandbox Ready.")

# Let's run a quick molecular weight loop:
amino_acids = ["Alanine", "Cysteine", "Glycine", "Valine"]
for i, aa in enumerate(amino_acids, start=1):
    print(f"Sample #{i}: {aa} sequence verified.")
`,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'template_dna',
      title: '2. DNA Base Frequency Analyzer',
      code: `# DNA GC-Content & Frequency Analyzer
dna_sample = "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC"

counts = {
    'A': dna_sample.count('A'),
    'C': dna_sample.count('C'),
    'G': dna_sample.count('G'),
    'T': dna_sample.count('T')
}

total = len(dna_sample)
gc_percent = ((counts['G'] + counts['C']) / total) * 100

print(f"Total Nucleotides: {total}")
for base, count in counts.items():
    print(f"Base {base}: {count} ({count/total*100:.1f}%)")
print(f"GC Content: {gc_percent:.2f}%")
`,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'template_stress',
      title: '3. Titanium Alloy Tensile Test',
      code: `# Materials Science: Stress & Strain Calculations
force_newtons = 45000  # Applied tensile load (N)
area_mm2 = 150         # Cross-sectional area (mm^2)

# Engineering stress = Force / Area (MPa)
stress_mpa = force_newtons / area_mm2
youngs_modulus_gpa = 110  # Titanium Grade 5 elastic modulus (GPa)

# Strain = Stress / Modulus (MPa to GPa conversion)
strain = stress_mpa / (youngs_modulus_gpa * 1000)

print(f"Load: {force_newtons} N on Area: {area_mm2} mm²")
print(f"Engineering Stress: {stress_mpa:.2f} MPa")
print(f"Calculated Elastic Strain: {strain:.6f}")
print("Status: Material within elastic deformation limit.")
`,
      updatedAt: new Date().toISOString(),
    },
  ],
};

export function loadPlayerProfile(): PlayerProfile {
  if (typeof window === 'undefined') return INITIAL_PLAYER_PROFILE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PLAYER_PROFILE;

    const parsed: PlayerProfile = JSON.parse(raw);
    
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const last = new Date(parsed.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;
    }

    // Refresh rank and level according to current XP
    const { rank, level } = calculateRankAndLevel(parsed.xp);
    parsed.rank = rank;
    parsed.level = level;

    return parsed;
  } catch (e) {
    console.error('Failed to parse saved player profile:', e);
    return INITIAL_PLAYER_PROFILE;
  }
}

export function savePlayerProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save player profile:', e);
  }
}
