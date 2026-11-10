import { Mission, Location } from '../types/Mission';

export const NEXUS_LOCATIONS: Location[] = [
  {
    id: 'training_station',
    name: 'Python Initiation Station',
    division: 'Central Nexus',
    levelRequired: 1,
    description: 'Calibrate foundational command syntax, quantum variables, and core terminal telemetry.',
    coordinates: { x: 18, y: 30 },
    color: '#00F5FF',
    icon: 'Terminal',
    missionIds: ['m1_1', 'm1_2', 'm1_3', 'm1_4', 'm1_5'],
  },
  {
    id: 'logic_lab',
    name: 'Logic & Threshold Chamber',
    division: 'Central Nexus',
    levelRequired: 2,
    description: 'Configure automated decision gates, conditional routing, and sensor safety interlocks.',
    coordinates: { x: 34, y: 62 },
    color: '#A855F7',
    icon: 'Cpu',
    missionIds: ['m2_1', 'm2_2', 'm2_3', 'm2_4', 'm2_5'],
  },
  {
    id: 'dna_research_lab',
    name: 'DNA Sequencing Observatory',
    division: 'Biotechnology',
    levelRequired: 3,
    description: 'Iterative loop processors analyzing genomic strands, codon repeats, and synthesis cycles.',
    coordinates: { x: 50, y: 22 },
    color: '#39FF14',
    icon: 'Dna',
    missionIds: ['m3_1', 'm3_2', 'm3_3', 'm3_4', 'm3_5'],
  },
  {
    id: 'material_testing_lab',
    name: 'Materials Stress & Structure Lab',
    division: 'Materials Science',
    levelRequired: 4,
    description: 'Dictionary and list matrix catalogs evaluating titanium alloys, polymers, and crystal lattice shear.',
    coordinates: { x: 68, y: 58 },
    color: '#00F5FF',
    icon: 'Layers',
    missionIds: ['m4_1', 'm4_2', 'm4_3', 'm4_4', 'm4_5'],
  },
  {
    id: 'function_reactor',
    name: 'Modular Function Reactor',
    division: 'Central Nexus',
    levelRequired: 5,
    description: 'Encapsulate reusable scientific formulas, parameters, return kinetics, and recursive engines.',
    coordinates: { x: 42, y: 82 },
    color: '#FF00E5',
    icon: 'Zap',
    missionIds: ['m5_1', 'm5_2', 'm5_3', 'm5_4', 'm5_5'],
  },
  {
    id: 'advanced_lab',
    name: 'OOP & Resilience Facility',
    division: 'Biotechnology',
    levelRequired: 6,
    description: 'Object-oriented sample representations, sensor fault handling, and bioinformatic search algorithms.',
    coordinates: { x: 78, y: 28 },
    color: '#A855F7',
    icon: 'ShieldCheck',
    missionIds: ['m6_1', 'm6_2', 'm6_3', 'm6_4', 'm6_5'],
  },
  {
    id: 'computational_center',
    name: 'Computational Science Center',
    division: 'Materials Science',
    levelRequired: 7,
    description: 'Array processing, scientific dataset manipulation, and empirical modeling.',
    coordinates: { x: 86, y: 72 },
    color: '#39FF14',
    icon: 'Activity',
    missionIds: ['m7_1', 'm7_2', 'm7_3', 'm7_4', 'm7_5'],
  },
  {
    id: 'nexus_core',
    name: 'The Nexus Core Reactor',
    division: 'Central Nexus',
    levelRequired: 8,
    description: 'EMERGENCY: Central AI reactor meltdown in progress. Solve 7 multi-system challenges to avert catastrophe.',
    coordinates: { x: 50, y: 50 },
    color: '#FF00E5',
    icon: 'Flame',
    missionIds: ['boss_core'],
  },
];

export const MISSIONS: Mission[] = [
  // ==================== LEVEL 1: PYTHON INITIATION ====================
  {
    id: 'm1_1',
    levelId: 1,
    title: 'DNA Sample Identifier',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 10,
    storyline: 'The primary DNA spectroscope has booted with zero calibration. Output the specimen designation label to register the sample.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'NanoDrop Spectrophotometer',
      description: 'Before spectrophotometric quantification, every genomic extract must be logged in the laboratory tracking ledger.',
    },
    pythonTopic: 'print() function',
    conceptExplanation: 'In Python, the print() function sends data to the standard output console. Text is enclosed inside quotation marks (" " or \' \').',
    exampleCode: 'print("Sample logged: Bio-01")',
    challengeInstructions: [
      'Use the print() function to output exactly: Specimen DNA-782 Activated',
    ],
    starterCode: `# Level 1: Python Initiation
# Mission: Output the exact specimen label

print("Specimen DNA-782 Activated")
`,
    solutionCode: 'print("Specimen DNA-782 Activated")',
    hints: [
      'Ensure the exact casing and spacing: Specimen DNA-782 Activated',
      'Wrap your text inside double quotes inside print(...)',
    ],
    testCases: [
      {
        id: 'tc1_1_1',
        description: 'Verify standard output matches expected registration line',
        expectedOutput: 'Specimen DNA-782 Activated',
      },
    ],
    locationId: 'training_station',
    unlockedByDefault: true,
  },
  {
    id: 'm1_2',
    levelId: 1,
    title: 'Material Density Calculator',
    track: 'materials_science',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'A titanium-carbide sample was synthesized in the vacuum furnace. Calculate its density using variables.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Helium Pycnometer',
      description: 'Density is a fundamental physical property defined as mass divided by volume: ρ = mass / volume (g/cm³).',
      realWorldFormula: 'ρ = m / V',
    },
    pythonTopic: 'Variables and Float Arithmetic',
    conceptExplanation: 'Variables store values in computer memory. The forward slash / performs floating-point division.',
    exampleCode: 'mass = 50.0\nvolume = 10.0\ndensity = mass / volume\nprint(density)',
    challengeInstructions: [
      'Create a variable named mass with value 45.0',
      'Create a variable named volume with value 10.0',
      'Calculate density = mass / volume',
      'Print the resulting density',
    ],
    starterCode: `# Materials Science: Density Calculation
# mass = 45.0, volume = 10.0

mass = 45.0
volume = 10.0

# Calculate and print density below:
`,
    solutionCode: `mass = 45.0
volume = 10.0
density = mass / volume
print(density)`,
    hints: [
      'Divide mass by volume using /',
      'Print density using print(density)',
    ],
    testCases: [
      {
        id: 'tc1_2_1',
        description: 'Calculate 45.0 / 10.0 and print result',
        expectedOutput: '4.5',
      },
    ],
    locationId: 'training_station',
  },
  {
    id: 'm1_3',
    levelId: 1,
    title: 'Cryogenic Thermal Conversion',
    track: 'materials_science',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'Superconducting magnet coils operate at liquid nitrogen temperature. Convert Celsius to Kelvin.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Cryostat Dilution Refrigerator',
      description: 'Kelvin is the thermodynamic temperature scale where 0 K represents absolute zero. T(K) = T(°C) + 273.15.',
      realWorldFormula: 'K = °C + 273.15',
    },
    pythonTopic: 'Arithmetic Operators & Float Types',
    conceptExplanation: 'Addition in Python is performed with the + operator. Decimals are represented as float types.',
    exampleCode: 'celsius = 25.0\nkelvin = celsius + 273.15\nprint(kelvin)',
    challengeInstructions: [
      'Given celsius = -196.0 (liquid nitrogen boiling point)',
      'Calculate kelvin = celsius + 273.15',
      'Print the kelvin temperature rounded to 2 decimals using round(kelvin, 2) or print(round(celsius + 273.15, 2))',
    ],
    starterCode: `celsius = -196.0

# Calculate Kelvin and print rounded to 2 decimal places:
kelvin = round(celsius + 273.15, 2)
print(kelvin)
`,
    solutionCode: `celsius = -196.0
kelvin = round(celsius + 273.15, 2)
print(kelvin)`,
    hints: [
      'Add 273.15 to -196.0',
      'The result is 77.15 K',
    ],
    testCases: [
      {
        id: 'tc1_3_1',
        description: 'Convert -196.0 C to Kelvin',
        expectedOutput: '77.15',
      },
    ],
    locationId: 'training_station',
  },
  {
    id: 'm1_4',
    levelId: 1,
    title: 'Beer-Lambert Protein Concentration',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Compute bovine serum albumin (BSA) concentration from UV absorbance at 280 nm.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'UV-Vis Spectrophotometer',
      description: 'Beer-Lambert law states A = ε * c * l, therefore c = A / (ε * l) where A is absorbance, ε is molar extinction coefficient, and l is cuvette path length.',
      realWorldFormula: 'c = A / (ε * l)',
    },
    pythonTopic: 'Operator Precedence and Variables',
    conceptExplanation: 'Parentheses ( ) control mathematical evaluation order, preventing unintended division operations.',
    exampleCode: 'A = 0.8\neps = 40.0\nl = 1.0\nc = A / (eps * l)\nprint(c)',
    challengeInstructions: [
      'Given absorbance A = 1.25',
      'Given extinction coefficient epsilon = 25.0',
      'Given path_length = 1.0',
      'Calculate concentration = A / (epsilon * path_length)',
      'Print concentration',
    ],
    starterCode: `A = 1.25
epsilon = 25.0
path_length = 1.0

# Calculate concentration = A / (epsilon * path_length) and print it
`,
    solutionCode: `A = 1.25
epsilon = 25.0
path_length = 1.0
concentration = A / (epsilon * path_length)
print(concentration)`,
    hints: [
      'Remember parentheses: A / (epsilon * path_length)',
      '1.25 / 25.0 gives 0.05',
    ],
    testCases: [
      {
        id: 'tc1_4_1',
        description: 'Compute BSA concentration from optical density',
        expectedOutput: '0.05',
      },
    ],
    locationId: 'training_station',
  },
  {
    id: 'm1_5',
    levelId: 1,
    title: 'Lab Access Authorization',
    track: 'foundations',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'The terminal access gate requires the operator to enter their scientist handle and print a clearance confirmation.',
    scientificContext: {
      domain: 'Core Computer Science',
      instrument: 'Biometric Gateway',
      description: 'Interactive user input via stdin allows lab operators to pass dynamic credentials at runtime.',
    },
    pythonTopic: 'input() and String Concatenation',
    conceptExplanation: 'input() pauses execution and reads a string from user input. In Python Nexus, this is seamlessly wired into the browser console.',
    exampleCode: 'name = input()\nprint("Welcome,", name)',
    challengeInstructions: [
      'Read the scientist name using input()',
      'Print: Authorized: <name>',
      'For example, if input is Dr. Sarah, output should be: Authorized: Dr. Sarah',
    ],
    starterCode: `# Read the scientist name and print the authorization line
user = input()
print("Authorized: " + user)
`,
    solutionCode: `user = input()
print("Authorized: " + user)`,
    hints: [
      'Use user = input()',
      'Use print(f"Authorized: {user}") or print("Authorized: " + user)',
    ],
    testCases: [
      {
        id: 'tc1_5_1',
        description: 'Authorize researcher Alex',
        input: 'Alex',
        expectedOutput: 'Authorized: Alex',
      },
      {
        id: 'tc1_5_2',
        description: 'Authorize researcher Dr. Elena',
        input: 'Dr. Elena',
        expectedOutput: 'Authorized: Dr. Elena',
      },
    ],
    locationId: 'training_station',
  },

  // ==================== LEVEL 2: LOGIC LABORATORY ====================
  {
    id: 'm2_1',
    levelId: 2,
    title: 'Bioreactor pH Classifier',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'Bacterial cell culture requires strict pH monitoring. Classify a pH reading into Acidic, Neutral, or Alkaline.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Digital pH Electrode',
      description: 'Solutions with pH < 7.0 are acidic, pH == 7.0 are neutral, and pH > 7.0 are basic/alkaline.',
    },
    pythonTopic: 'if, elif, else Conditions',
    conceptExplanation: 'Conditional statements allow your program to take different paths depending on whether boolean comparisons evaluate to True or False.',
    exampleCode: `ph = 6.5
if ph < 7.0:
    print("Acidic")
elif ph > 7.0:
    print("Alkaline")
else:
    print("Neutral")`,
    challengeInstructions: [
      'Read a float pH value from input() using float(input())',
      'If ph < 7.0: print("Acidic")',
      'If ph == 7.0: print("Neutral")',
      'If ph > 7.0: print("Alkaline")',
    ],
    starterCode: `ph = float(input())

# Write conditional classification:
if ph < 7.0:
    print("Acidic")
elif ph == 7.0:
    print("Neutral")
else:
    print("Alkaline")
`,
    solutionCode: `ph = float(input())
if ph < 7.0:
    print("Acidic")
elif ph == 7.0:
    print("Neutral")
else:
    print("Alkaline")`,
    hints: ['Remember to convert input string to float using float(input())'],
    testCases: [
      { id: 'tc2_1_1', description: 'pH 5.4 should classify as Acidic', input: '5.4', expectedOutput: 'Acidic' },
      { id: 'tc2_1_2', description: 'pH 7.0 should classify as Neutral', input: '7.0', expectedOutput: 'Neutral' },
      { id: 'tc2_1_3', description: 'pH 8.2 should classify as Alkaline', input: '8.2', expectedOutput: 'Alkaline' },
    ],
    locationId: 'logic_lab',
  },
  {
    id: 'm2_2',
    levelId: 2,
    title: 'Superalloy Yield Strength Gate',
    track: 'materials_science',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Aerospace turbines require nickel superalloys with yield strength >= 850 MPa and density <= 8.5 g/cm³.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Universal Testing Machine (UTM)',
      description: 'Materials must pass simultaneous physical threshold criteria before certification for supersonic flight.',
    },
    pythonTopic: 'Logical and / or Operators',
    conceptExplanation: 'The and operator returns True only if both conditions are True. The or operator returns True if at least one is True.',
    exampleCode: 'if strength >= 850 and density <= 8.5:\n    print("PASSED")\nelse:\n    print("REJECTED")',
    challengeInstructions: [
      'Read yield_strength as float from first input line',
      'Read density as float from second input line',
      'If yield_strength >= 850.0 and density <= 8.5: print("CERTIFIED")',
      'Otherwise: print("FAILED")',
    ],
    starterCode: `yield_strength = float(input())
density = float(input())

# Check certification criteria:
`,
    solutionCode: `yield_strength = float(input())
density = float(input())
if yield_strength >= 850.0 and density <= 8.5:
    print("CERTIFIED")
else:
    print("FAILED")`,
    hints: ['Use the keyword `and` to combine both conditions'],
    testCases: [
      { id: 'tc2_2_1', description: 'Valid alloy (920 MPa, 8.2 g/cm3)', input: '920.0\n8.2', expectedOutput: 'CERTIFIED' },
      { id: 'tc2_2_2', description: 'High density alloy (950 MPa, 8.9 g/cm3)', input: '950.0\n8.9', expectedOutput: 'FAILED' },
      { id: 'tc2_2_3', description: 'Low strength alloy (800 MPa, 8.1 g/cm3)', input: '800.0\n8.1', expectedOutput: 'FAILED' },
    ],
    locationId: 'logic_lab',
  },
  {
    id: 'm2_3',
    levelId: 2,
    title: 'DNA Primer Length Verifier',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'PCR primers must be between 18 and 25 nucleotides long for specific target gene amplification.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Thermal Cycler (PCR)',
      description: 'Primers that are too short cause nonspecific binding; primers that are too long anneal inefficiently.',
    },
    pythonTopic: 'len() and Chained Comparisons',
    conceptExplanation: 'len(text) returns the number of characters in a string. Python allows chained comparisons like 18 <= length <= 25.',
    exampleCode: 'length = len(primer)\nif 18 <= length <= 25:\n    print("VALID")',
    challengeInstructions: [
      'Read a DNA primer sequence string from input()',
      'Compute its length using len()',
      'If length is between 18 and 25 inclusive, print "OPTIMAL"',
      'Otherwise, print "SUBOPTIMAL"',
    ],
    starterCode: `primer = input()

# Check primer length
if 18 <= len(primer) <= 25:
    print("OPTIMAL")
else:
    print("SUBOPTIMAL")
`,
    solutionCode: `primer = input()
if 18 <= len(primer) <= 25:
    print("OPTIMAL")
else:
    print("SUBOPTIMAL")`,
    hints: ['Use len(primer) to find number of bases', 'Check 18 <= len(primer) <= 25'],
    testCases: [
      { id: 'tc2_3_1', description: '20-base primer ATGCGATCGATCGATCGATC', input: 'ATGCGATCGATCGATCGATC', expectedOutput: 'OPTIMAL' },
      { id: 'tc2_3_2', description: 'Short 8-base primer ATGCGATC', input: 'ATGCGATC', expectedOutput: 'SUBOPTIMAL' },
    ],
    locationId: 'logic_lab',
  },
  {
    id: 'm2_4',
    levelId: 2,
    title: 'Cryo-Storage Thermal Interlock',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Cryopreservation freezers must stay below -80°C. If temperature exceeds -70°C, trigger an alarm; otherwise if between -80°C and -70°C, trigger warning; else normal.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Ultra-Low Temperature Freezer',
      description: 'Preserving bio-active cell lines and crystal polymers requires ultra-low sub-zero temperatures.',
    },
    pythonTopic: 'Nested Conditionals',
    conceptExplanation: 'Multiple elif branches allow fine-grained categorization of sensory telemetry.',
    exampleCode: 'if temp > -70:\n    print("ALARM")\nelif temp > -80:\n    print("WARNING")\nelse:\n    print("NORMAL")',
    challengeInstructions: [
      'Read temperature as float from input()',
      'If temp > -70.0: print("ALARM")',
      'Elif temp > -80.0: print("WARNING")',
      'Else: print("NORMAL")',
    ],
    starterCode: `temp = float(input())

# Implement thermal interlock check:
`,
    solutionCode: `temp = float(input())
if temp > -70.0:
    print("ALARM")
elif temp > -80.0:
    print("WARNING")
else:
    print("NORMAL")`,
    hints: ['Check greater than -70 first, then greater than -80'],
    testCases: [
      { id: 'tc2_4_1', description: 'Critical warm temp -65.0 C', input: '-65.0', expectedOutput: 'ALARM' },
      { id: 'tc2_4_2', description: 'Borderline temp -75.0 C', input: '-75.0', expectedOutput: 'WARNING' },
      { id: 'tc2_4_3', description: 'Optimal temp -85.5 C', input: '-85.5', expectedOutput: 'NORMAL' },
    ],
    locationId: 'logic_lab',
  },
  {
    id: 'm2_5',
    levelId: 2,
    title: 'Bacterial Growth Phase Classifier',
    track: 'biotechnology',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Analyze optical density at 600nm (OD600) to identify the bacterial growth curve phase.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Automated Microplate Reader',
      description: 'OD600 < 0.2 indicates Lag phase; 0.2 <= OD600 <= 1.0 indicates Log (exponential) phase; > 1.0 indicates Stationary phase.',
    },
    pythonTopic: 'Multiple Condition Classification',
    conceptExplanation: 'Categorizing empirical telemetry based on quantitative boundary thresholds.',
    exampleCode: 'if od < 0.2: ...',
    challengeInstructions: [
      'Read od as float from input()',
      'If od < 0.2: print("Lag Phase")',
      'Elif 0.2 <= od <= 1.0: print("Log Phase")',
      'Else: print("Stationary Phase")',
    ],
    starterCode: `od = float(input())

# Classify bacterial growth phase:
`,
    solutionCode: `od = float(input())
if od < 0.2:
    print("Lag Phase")
elif 0.2 <= od <= 1.0:
    print("Log Phase")
else:
    print("Stationary Phase")`,
    hints: ['Print exact strings: "Lag Phase", "Log Phase", or "Stationary Phase"'],
    testCases: [
      { id: 'tc2_5_1', description: 'OD 0.05 is Lag Phase', input: '0.05', expectedOutput: 'Lag Phase' },
      { id: 'tc2_5_2', description: 'OD 0.65 is Log Phase', input: '0.65', expectedOutput: 'Log Phase' },
      { id: 'tc2_5_3', description: 'OD 1.4 is Stationary Phase', input: '1.4', expectedOutput: 'Stationary Phase' },
    ],
    locationId: 'logic_lab',
  },

  // ==================== LEVEL 3: LOOP DIMENSION ====================
  {
    id: 'm3_1',
    levelId: 3,
    title: 'DNA Adenine Base Detector',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'The genomic analyzer received a raw strand. Iterate through the nucleotides and count adenine (A) occurrences.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Illumina NextSeq',
      description: 'Adenine (A) pairs with Thymine (T) via two hydrogen bonds. Base frequency is key to thermal melting temperatures.',
    },
    pythonTopic: 'for loop over string',
    conceptExplanation: 'A for loop can traverse every item in an iterable sequence (like characters in a string) one by one.',
    exampleCode: `dna = "ATGCAATA"
count = 0
for base in dna:
    if base == 'A':
        count += 1
print(count)`,
    challengeInstructions: [
      'Given dna = "ATGCAATACGA"\nWrite a for loop to count how many times the letter "A" appears, then print the count.',
    ],
    starterCode: `dna = "ATGCAATACGA"

# Write a loop to count 'A' bases and print the count:
count = 0
for base in dna:
    if base == "A":
        count += 1
print(count)
`,
    solutionCode: `dna = "ATGCAATACGA"
count = 0
for base in dna:
    if base == "A":
        count += 1
print(count)`,
    hints: ['Initialize count = 0', 'Check if base == "A"', 'Print count at the end'],
    testCases: [
      { id: 'tc3_1_1', description: 'Count A in ATGCAATACGA (5 As)', expectedOutput: '5' },
    ],
    locationId: 'dna_research_lab',
  },
  {
    id: 'm3_2',
    levelId: 3,
    title: 'Exponential Bacterial Doubling',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'An E. coli colony doubles every 20 minutes. Simulate population growth until it exceeds a target capacity.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Incubator Shaker',
      description: 'Under rich nutrient conditions, single-cell microorganisms multiply exponentially via binary fission: N = N0 * 2^g.',
    },
    pythonTopic: 'while loop',
    conceptExplanation: 'A while loop executes repeatedly as long as its condition remains True.',
    exampleCode: `cells = 100
generations = 0
while cells < 1000:
    cells *= 2
    generations += 1
print(generations)`,
    challengeInstructions: [
      'Initial population: cells = 50',
      'Target population: 800',
      'Use a while loop where in each step cells double (cells = cells * 2) and hours increase by 1',
      'Stop when cells >= 800 and print the number of hours elapsed',
    ],
    starterCode: `cells = 50
target = 800
hours = 0

# Use a while loop to find how many hours it takes to reach or exceed target:
while cells < target:
    cells *= 2
    hours += 1

print(hours)
`,
    solutionCode: `cells = 50
target = 800
hours = 0
while cells < target:
    cells *= 2
    hours += 1
print(hours)`,
    hints: ['50 -> 100 -> 200 -> 400 -> 800 (4 doublings)'],
    testCases: [
      { id: 'tc3_2_1', description: '50 to 800 takes 4 doubling hours', expectedOutput: '4' },
    ],
    locationId: 'dna_research_lab',
  },
  {
    id: 'm3_3',
    levelId: 3,
    title: 'Batch Tensile Stress Analyzer',
    track: 'materials_science',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'A series of test specimens were pulled in the hydraulic tensometer. Calculate the average stress from the batch.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Hydraulic Material Tester',
      description: 'Quality assurance requires averaging fracture stress across replicate test coupons to determine statistical reliability.',
    },
    pythonTopic: 'Iterating lists and accumulating sum',
    conceptExplanation: 'Looping over a list and summing values to calculate statistical means.',
    exampleCode: `measurements = [450, 470, 460]
total = sum(measurements)
avg = total / len(measurements)
print(avg)`,
    challengeInstructions: [
      'Given readings = [520, 535, 510, 545, 530]',
      'Calculate the average stress (sum divided by count)',
      'Print the average',
    ],
    starterCode: `readings = [520, 535, 510, 545, 530]

# Calculate and print average:
avg = sum(readings) / len(readings)
print(avg)
`,
    solutionCode: `readings = [520, 535, 510, 545, 530]
print(sum(readings) / len(readings))`,
    hints: ['Sum is 2640, divided by 5 is 528.0'],
    testCases: [
      { id: 'tc3_3_1', description: 'Average of [520, 535, 510, 545, 530]', expectedOutput: '528.0' },
    ],
    locationId: 'dna_research_lab',
  },
  {
    id: 'm3_4',
    levelId: 3,
    title: 'Thermal Furnace Anomaly Breaker',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'A crystal growth furnace monitor scans temperatures. If any reading exceeds critical threshold 1200°C, break the loop immediately and print the index.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Czochralski Crystal Puller',
      description: 'Emergency trip routines must halt scans instantly upon identifying dangerous thermal runaway.',
    },
    pythonTopic: 'break and enumerate()',
    conceptExplanation: 'The break statement exits the enclosing loop immediately. enumerate() provides both index and item.',
    exampleCode: `for idx, val in enumerate(temps):
    if val > 1200:
        print(idx)
        break`,
    challengeInstructions: [
      'Given temperatures = [950, 1020, 1150, 1280, 1400, 990]',
      'Iterate through temperatures with enumerate()',
      'When you encounter a temperature > 1200, print its zero-based index and break immediately',
    ],
    starterCode: `temperatures = [950, 1020, 1150, 1280, 1400, 990]

# Scan and break on first temperature > 1200:
`,
    solutionCode: `temperatures = [950, 1020, 1150, 1280, 1400, 990]
for idx, t in enumerate(temperatures):
    if t > 1200:
        print(idx)
        break`,
    hints: ['1280 is at index 3', 'Use break right after printing the index'],
    testCases: [
      { id: 'tc3_4_1', description: 'First temp > 1200 is 1280 at index 3', expectedOutput: '3' },
    ],
    locationId: 'dna_research_lab',
  },
  {
    id: 'm3_5',
    levelId: 3,
    title: 'Polymer Chain Unit Aggregator',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Synthesize monomer molecular weights using range() step iteration to calculate total oligomer mass.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Gel Permeation Chromatograph',
      description: 'Synthetic polymers are assembled by repeating unit additions. Step loops model staggered polymer additions.',
    },
    pythonTopic: 'range() with start, stop, step',
    conceptExplanation: 'range(start, stop, step) produces an arithmetic progression of integers.',
    exampleCode: `total = 0
for weight in range(10, 50, 10):
    total += weight
print(total)`,
    challengeInstructions: [
      'Sum all even integers from 2 to 20 inclusive using range(2, 22, 2)',
      'Print the final sum',
    ],
    starterCode: `# Sum even integers from 2 to 20 inclusive
total = sum(range(2, 22, 2))
print(total)
`,
    solutionCode: `total = sum(range(2, 22, 2))
print(total)`,
    hints: ['range(2, 22, 2) generates [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]', 'Sum is 110'],
    testCases: [
      { id: 'tc3_5_1', description: 'Sum of evens from 2 to 20', expectedOutput: '110' },
    ],
    locationId: 'dna_research_lab',
  },

  // ==================== LEVEL 4: DATA STRUCTURE GALAXY ====================
  {
    id: 'm4_1',
    levelId: 4,
    title: 'Nucleotide Frequency Dictionary',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'Count every base (A, C, G, T) in a genetic strand and store them in a Python dictionary.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Bioinformatics Sequence Analyzer',
      description: 'Dictionary mappings allow key-value lookup of genomic motifs, crucial for metagenomic taxonomy.',
    },
    pythonTopic: 'Dictionaries and string.count()',
    conceptExplanation: 'Dictionaries store data in key: value pairs. Example: {"A": 10, "C": 5}.',
    exampleCode: `seq = "AGCT"
data = {"A": seq.count("A"), "G": seq.count("G")}
print(data["A"])`,
    challengeInstructions: [
      'Given strand = "AGCTAGCTAA"',
      'Create a dictionary counts with keys "A", "C", "G", "T"',
      'Store their respective counts using strand.count(...)',
      'Print the count for "A"',
    ],
    starterCode: `strand = "AGCTAGCTAA"

# Create counts dictionary and print counts["A"]
counts = {
    "A": strand.count("A"),
    "C": strand.count("C"),
    "G": strand.count("G"),
    "T": strand.count("T"),
}
print(counts["A"])
`,
    solutionCode: `strand = "AGCTAGCTAA"
counts = {
    "A": strand.count("A"),
    "C": strand.count("C"),
    "G": strand.count("G"),
    "T": strand.count("T"),
}
print(counts["A"])`,
    hints: ['There are 4 "A"s in AGCTAGCTAA'],
    testCases: [
      { id: 'tc4_1_1', description: 'Verify count of A in strand is 4', expectedOutput: '4' },
    ],
    locationId: 'material_testing_lab',
  },
  {
    id: 'm4_2',
    levelId: 4,
    title: 'Alloy Composition Slicing',
    track: 'materials_science',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Extract specific alloying elements from an ordered chemical composition list using Python list slicing.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'X-Ray Fluorescence (XRF) Spectrometer',
      description: 'Modern high-entropy alloys contain 5 or more principal elements in equiatomic proportions.',
    },
    pythonTopic: 'List Slicing [start:end]',
    conceptExplanation: 'Slicing list[start:end] extracts elements from index start up to (but not including) end.',
    exampleCode: 'elements = ["Fe", "Ni", "Cr", "Co", "Mn"]\ncore = elements[1:4]\nprint(core)',
    challengeInstructions: [
      'Given alloy = ["Titanium", "Aluminum", "Vanadium", "Iron", "Oxygen"]',
      'Slice elements from index 1 to 3 inclusive (i.e. up to index 4)',
      'Print the sliced list',
    ],
    starterCode: `alloy = ["Titanium", "Aluminum", "Vanadium", "Iron", "Oxygen"]

# Slice from index 1 up to index 4:
sub_alloy = alloy[1:4]
print(sub_alloy)
`,
    solutionCode: `alloy = ["Titanium", "Aluminum", "Vanadium", "Iron", "Oxygen"]
print(alloy[1:4])`,
    hints: ['alloy[1:4] extracts ["Aluminum", "Vanadium", "Iron"]'],
    testCases: [
      { id: 'tc4_2_1', description: 'Slice elements 1:4', expectedOutput: "['Aluminum', 'Vanadium', 'Iron']" },
    ],
    locationId: 'material_testing_lab',
  },
  {
    id: 'm4_3',
    levelId: 4,
    title: 'Unique Contaminant Set Filter',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Mass spectrometer readings detected duplicate particulate ion peaks. Filter duplicates and sort the unique ions.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'MALDI-TOF Mass Spectrometer',
      description: 'Contaminant elimination ensures pure peptide fingerprint spectra.',
    },
    pythonTopic: 'Sets and sorted()',
    conceptExplanation: 'set() removes all duplicate elements. sorted() returns a sorted list of unique items.',
    exampleCode: 'raw = [5, 2, 5, 1, 2]\nunique = sorted(list(set(raw)))\nprint(unique)',
    challengeInstructions: [
      'Given ions = ["Na", "K", "Cl", "Na", "Ca", "Cl", "Mg"]',
      'Convert to set to isolate unique items, then sort alphabetically using sorted()',
      'Print the resulting sorted list',
    ],
    starterCode: `ions = ["Na", "K", "Cl", "Na", "Ca", "Cl", "Mg"]

# Create sorted list of unique ions:
unique_ions = sorted(list(set(ions)))
print(unique_ions)
`,
    solutionCode: `ions = ["Na", "K", "Cl", "Na", "Ca", "Cl", "Mg"]
print(sorted(list(set(ions))))`,
    hints: ['Unique elements: Ca, Cl, K, Mg, Na in alphabetical order'],
    testCases: [
      { id: 'tc4_3_1', description: 'Alphabetical unique ions', expectedOutput: "['Ca', 'Cl', 'K', 'Mg', 'Na']" },
    ],
    locationId: 'material_testing_lab',
  },
  {
    id: 'm4_4',
    levelId: 4,
    title: 'Crystal Lattice Parameter Tuple',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Lattice constants (a, b, c, alpha, beta, gamma) are immutable crystallographic constants stored as tuples.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'X-Ray Diffractometer (XRD)',
      description: 'Cubic crystal unit cells satisfy a = b = c and α = β = γ = 90°. Immutable tuples safeguard physical standards.',
    },
    pythonTopic: 'Tuples and Unpacking',
    conceptExplanation: 'Tuples are defined with ( ) and are immutable. You can unpack them: a, b, c = cell_lengths.',
    exampleCode: 'cell = (3.52, 3.52, 3.52)\na, b, c = cell\nvolume = a * b * c\nprint(round(volume, 2))',
    challengeInstructions: [
      'Given cell = (4.0, 4.0, 4.0)',
      'Unpack a, b, c = cell',
      'Calculate unit cell volume = a * b * c',
      'Print the volume',
    ],
    starterCode: `cell = (4.0, 4.0, 4.0)

# Unpack and calculate volume
a, b, c = cell
vol = a * b * c
print(vol)
`,
    solutionCode: `cell = (4.0, 4.0, 4.0)
a, b, c = cell
print(a * b * c)`,
    hints: ['4.0 * 4.0 * 4.0 = 64.0'],
    testCases: [
      { id: 'tc4_4_1', description: 'Calculate 4.0^3 unit cell volume', expectedOutput: '64.0' },
    ],
    locationId: 'material_testing_lab',
  },
  {
    id: 'm4_5',
    levelId: 4,
    title: 'Restriction Enzyme Cleavage Splice',
    track: 'biotechnology',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Simulate EcoRI endonuclease cleavage at GAATTC motif and re-ligate with an engineered insert.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Gel Electrophoresis Chamber',
      description: 'Recombinant DNA cloning involves digesting plasmids at specific restriction sites and ligating synthetic inserts.',
    },
    pythonTopic: 'String .find() and Slicing',
    conceptExplanation: 'text.find(sub) returns the index where sub begins. Slicing reconstructs strings around that point.',
    exampleCode: 'idx = plasmid.find("GAATTC")',
    challengeInstructions: [
      'Given plasmid = "CCGGAATTCAA"',
      'Find index of "GAATTC" using plasmid.find("GAATTC")',
      'Print the index',
    ],
    starterCode: `plasmid = "CCGGAATTCAA"

# Find restriction site index and print it:
idx = plasmid.find("GAATTC")
print(idx)
`,
    solutionCode: `plasmid = "CCGGAATTCAA"
print(plasmid.find("GAATTC"))`,
    hints: ['"CCG" is 3 chars, so "GAATTC" starts at index 3'],
    testCases: [
      { id: 'tc4_5_1', description: 'Find EcoRI site index in CCGGAATTCAA', expectedOutput: '3' },
    ],
    locationId: 'material_testing_lab',
  },

  // ==================== LEVEL 5: FUNCTION REACTOR ====================
  {
    id: 'm5_1',
    levelId: 5,
    title: 'DNA Melting Temp Calculator Function',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 15,
    storyline: 'Build a reusable Python function to calculate Wallace DNA melting temperature Tm = 2*(A+T) + 4*(G+C).',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'PCR Thermal Cycler',
      description: 'Wallace formula approximates primer annealing temperature: Tm (°C) = 2(A+T) + 4(G+C).',
      realWorldFormula: 'Tm = 2(A+T) + 4(G+C)',
    },
    pythonTopic: 'def functions and return',
    conceptExplanation: 'Functions package repeatable logic. The return keyword hands back the calculated answer to the caller.',
    exampleCode: `def calc_tm(seq):
    a = seq.count('A')
    t = seq.count('T')
    g = seq.count('G')
    c = seq.count('C')
    return 2 * (a + t) + 4 * (g + c)

print(calc_tm("ATGC"))`,
    challengeInstructions: [
      'Define a function named calc_tm(seq)',
      'Calculate Tm = 2 * (seq.count("A") + seq.count("T")) + 4 * (seq.count("G") + seq.count("C"))',
      'Return the calculated Tm integer',
      'Call calc_tm("ATGCGATC") and print the result',
    ],
    starterCode: `def calc_tm(seq):
    a = seq.count("A")
    t = seq.count("T")
    g = seq.count("G")
    c = seq.count("C")
    return 2 * (a + t) + 4 * (g + c)

# Test with sequence "ATGCGATC"
print(calc_tm("ATGCGATC"))
`,
    solutionCode: `def calc_tm(seq):
    a = seq.count("A")
    t = seq.count("T")
    g = seq.count("G")
    c = seq.count("C")
    return 2 * (a + t) + 4 * (g + c)

print(calc_tm("ATGCGATC"))`,
    hints: ['A: 2, T: 2 -> 2*(4) = 8. G: 2, C: 2 -> 4*(4) = 16. Total = 24'],
    testCases: [
      { id: 'tc5_1_1', description: 'Calculate Wallace Tm for ATGCGATC', expectedOutput: '24' },
    ],
    locationId: 'function_reactor',
  },
  {
    id: 'm5_2',
    levelId: 5,
    title: 'Hooke Elastic Modulus Function',
    track: 'materials_science',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Encapsulate Hooke Law of Elasticity: E = stress / strain into a dedicated materials science function.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Dynamic Mechanical Analyzer (DMA)',
      description: 'Young modulus measures solid stiffness under tensile or compressive load in gigapascals (GPa).',
      realWorldFormula: 'E = σ / ε',
    },
    pythonTopic: 'Function Parameters and Default Values',
    conceptExplanation: 'Functions can take multiple parameters and return clean formatted values.',
    exampleCode: `def youngs_modulus(stress_mpa, strain):
    return stress_mpa / (strain * 1000) # GPa`,
    challengeInstructions: [
      'Define a function named calculate_modulus(stress, strain)',
      'Return stress / strain rounded to 1 decimal place using round(..., 1)',
      'Call calculate_modulus(400.0, 0.002) and print the result',
    ],
    starterCode: `def calculate_modulus(stress, strain):
    # Return stress / strain rounded to 1 decimal:
    return round(stress / strain, 1)

print(calculate_modulus(400.0, 0.002))
`,
    solutionCode: `def calculate_modulus(stress, strain):
    return round(stress / strain, 1)

print(calculate_modulus(400.0, 0.002))`,
    hints: ['400.0 / 0.002 = 200000.0'],
    testCases: [
      { id: 'tc5_2_1', description: 'calculate_modulus(400.0, 0.002)', expectedOutput: '200000.0' },
    ],
    locationId: 'function_reactor',
  },
  {
    id: 'm5_3',
    levelId: 5,
    title: 'Bacterial Growth Predictor with Default Args',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 25,
    storyline: 'Write a growth predictor with a default doubling time of 2 hours.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Bioreactor Fermenter',
      description: 'Default parameters provide sensible biological defaults when strain generation times are standard.',
    },
    pythonTopic: 'Default Argument Values',
    conceptExplanation: 'def func(param, default_param=val): provides a fallback when the caller omits the argument.',
    exampleCode: `def grow(n0, hours, doubling_time=2):
    return n0 * (2 ** (hours // doubling_time))`,
    challengeInstructions: [
      'Define grow_population(n0, hours, doubling=2)',
      'Formula: n0 * (2 ** (hours // doubling))',
      'Call grow_population(100, 6) and print the result (using the default doubling=2)',
    ],
    starterCode: `def grow_population(n0, hours, doubling=2):
    return n0 * (2 ** (hours // doubling))

# Call with n0=100, hours=6:
print(grow_population(100, 6))
`,
    solutionCode: `def grow_population(n0, hours, doubling=2):
    return n0 * (2 ** (hours // doubling))

print(grow_population(100, 6))`,
    hints: ['6 // 2 = 3 doublings. 100 * 2^3 = 800'],
    testCases: [
      { id: 'tc5_3_1', description: 'grow_population(100, 6) with default doubling', expectedOutput: '800' },
    ],
    locationId: 'function_reactor',
  },
  {
    id: 'm5_4',
    levelId: 5,
    title: 'Mohs to Vickers Hardness Converter',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Create a function pipeline mapping mineral hardness to Vickers indentation numbers.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Vickers Microhardness Indenter',
      description: 'Empirical approximations relate Mohs mineral scratch hardness to diamond pyramid hardness (HV).',
    },
    pythonTopic: 'Function composition & Dictionary Dispatch',
    conceptExplanation: 'Using functions with internal lookup tables for standard scientific conversions.',
    exampleCode: `def mohs_to_vickers(mohs):
    table = {1: 30, 2: 70, 7: 1100, 9: 2100, 10: 10000}
    return table.get(mohs, 0)`,
    challengeInstructions: [
      'Write a function mohs_to_vickers(mohs_value)',
      'Mapping: 1 -> 30, 7 (Quartz) -> 1100, 9 (Corundum) -> 2100, 10 (Diamond) -> 10000',
      'Call mohs_to_vickers(7) and print the result',
    ],
    starterCode: `def mohs_to_vickers(mohs_value):
    table = {1: 30, 7: 1100, 9: 2100, 10: 10000}
    return table.get(mohs_value, 0)

print(mohs_to_vickers(7))
`,
    solutionCode: `def mohs_to_vickers(mohs_value):
    table = {1: 30, 7: 1100, 9: 2100, 10: 10000}
    return table.get(mohs_value, 0)

print(mohs_to_vickers(7))`,
    hints: ['Quartz at Mohs 7 returns 1100'],
    testCases: [
      { id: 'tc5_4_1', description: 'Vickers hardness of Quartz (Mohs 7)', expectedOutput: '1100' },
    ],
    locationId: 'function_reactor',
  },
  {
    id: 'm5_5',
    levelId: 5,
    title: 'Recursive DNA Oligomer Permutations',
    track: 'biotechnology',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Compute total possible sequence permutations for an N-length oligomer using recursion (factorial).',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'DNA Microarray Synthesizer',
      description: 'Combinatorial sequence diversity scales rapidly with motif length.',
    },
    pythonTopic: 'Recursion',
    conceptExplanation: 'A recursive function calls itself to solve smaller subproblems until hitting a base case.',
    exampleCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    challengeInstructions: [
      'Write a recursive factorial function named factorial(n)',
      'If n <= 1 return 1, else return n * factorial(n - 1)',
      'Call factorial(5) and print the result',
    ],
    starterCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
`,
    solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
    hints: ['5 * 4 * 3 * 2 * 1 = 120'],
    testCases: [
      { id: 'tc5_5_1', description: 'Recursive factorial(5)', expectedOutput: '120' },
    ],
    locationId: 'function_reactor',
  },

  // ==================== LEVEL 6: ADVANCED PROGRAMMING LAB ====================
  {
    id: 'm6_1',
    levelId: 6,
    title: 'Sensor Fault Exception Handling',
    track: 'materials_science',
    difficulty: 'easy',
    xpReward: 20,
    storyline: 'Radiation sensors intermittently emit corrupted non-numeric telemetry. Use try/except to safeguard the acquisition pipeline.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Geiger-Müller Scintillation Counter',
      description: 'Electromagnetic interference in plasma chambers can cause bus transmission errors.',
    },
    pythonTopic: 'try / except ValueError',
    conceptExplanation: 'try/except catches runtime exceptions so programs fail gracefully rather than crashing.',
    exampleCode: `raw = "CORRUPTED"
try:
    val = float(raw)
    print(val)
except ValueError:
    print("SENSOR_OFFLINE")`,
    challengeInstructions: [
      'Read a string from input()',
      'Try to convert it to float and print "VAL:" followed by the float',
      'If a ValueError occurs, print "SENSOR_OFFLINE"',
    ],
    starterCode: `sensor_raw = input()

try:
    val = float(sensor_raw)
    print(f"VAL: {val}")
except ValueError:
    print("SENSOR_OFFLINE")
`,
    solutionCode: `sensor_raw = input()
try:
    val = float(sensor_raw)
    print(f"VAL: {val}")
except ValueError:
    print("SENSOR_OFFLINE")`,
    hints: ['Wrap float(sensor_raw) in try block', 'Catch ValueError'],
    testCases: [
      { id: 'tc6_1_1', description: 'Corrupted telemetry', input: 'ERR_NOISE', expectedOutput: 'SENSOR_OFFLINE' },
      { id: 'tc6_1_2', description: 'Valid reading 42.5', input: '42.5', expectedOutput: 'VAL: 42.5' },
    ],
    locationId: 'advanced_lab',
  },
  {
    id: 'm6_2',
    levelId: 6,
    title: 'BioSample Object Class',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 30,
    storyline: 'Model biological specimens with Object-Oriented Programming (OOP) classes.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Laboratory Information Management System (LIMS)',
      description: 'Enterprise LIMS architectures represent cryo-vials, barcodes, and cell strains as class instances.',
    },
    pythonTopic: 'Classes, __init__, and Methods',
    conceptExplanation: 'A class is a blueprint for objects. __init__ initializes attributes on self.',
    exampleCode: `class Specimen:
    def __init__(self, name, temp):
        self.name = name
        self.temp = temp

    def is_safe(self):
        return self.temp <= -80`,
    challengeInstructions: [
      'Create a class BioSample with __init__(self, sample_id, volume_ul)',
      'Add a method extract(self, amount) that subtracts amount from volume_ul',
      'Instantiate sample = BioSample("BS-101", 100)',
      'Call sample.extract(25)',
      'Print sample.volume_ul',
    ],
    starterCode: `class BioSample:
    def __init__(self, sample_id, volume_ul):
        self.sample_id = sample_id
        self.volume_ul = volume_ul

    def extract(self, amount):
        self.volume_ul -= amount

sample = BioSample("BS-101", 100)
sample.extract(25)
print(sample.volume_ul)
`,
    solutionCode: `class BioSample:
    def __init__(self, sample_id, volume_ul):
        self.sample_id = sample_id
        self.volume_ul = volume_ul

    def extract(self, amount):
        self.volume_ul -= amount

sample = BioSample("BS-101", 100)
sample.extract(25)
print(sample.volume_ul)`,
    hints: ['100 - 25 leaves 75'],
    testCases: [
      { id: 'tc6_2_1', description: 'Extract 25 from 100 uL sample', expectedOutput: '75' },
    ],
    locationId: 'advanced_lab',
  },
  {
    id: 'm6_3',
    levelId: 6,
    title: 'SmartMaterial Class Inheritance',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Inherit base Material properties into specialized ShapeMemoryAlloy class with thermal trigger temperatures.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Differential Scanning Calorimeter (DSC)',
      description: 'Nitinol shape memory alloys revert to pre-deformed configurations upon passing austenite transition temperature.',
    },
    pythonTopic: 'Class Inheritance and super()',
    conceptExplanation: 'Subclasses inherit parent class attributes and methods using super().__init__(...).',
    exampleCode: `class Material:
    def __init__(self, name):
        self.name = name

class Alloy(Material):
    def __init__(self, name, transition_temp):
        super().__init__(name)
        self.transition_temp = transition_temp`,
    challengeInstructions: [
      'Define Material with __init__(self, name)',
      'Define ShapeMemoryAlloy(Material) with __init__(self, name, transition_celsius)',
      'Instantiate sma = ShapeMemoryAlloy("Nitinol", 65.0)',
      'Print: f"{sma.name} active at {sma.transition_celsius}C"',
    ],
    starterCode: `class Material:
    def __init__(self, name):
        self.name = name

class ShapeMemoryAlloy(Material):
    def __init__(self, name, transition_celsius):
        super().__init__(name)
        self.transition_celsius = transition_celsius

sma = ShapeMemoryAlloy("Nitinol", 65.0)
print(f"{sma.name} active at {sma.transition_celsius}C")
`,
    solutionCode: `class Material:
    def __init__(self, name):
        self.name = name

class ShapeMemoryAlloy(Material):
    def __init__(self, name, transition_celsius):
        super().__init__(name)
        self.transition_celsius = transition_celsius

sma = ShapeMemoryAlloy("Nitinol", 65.0)
print(f"{sma.name} active at {sma.transition_celsius}C")`,
    hints: ['Output: Nitinol active at 65.0C'],
    testCases: [
      { id: 'tc6_3_1', description: 'Check inheritance attributes', expectedOutput: 'Nitinol active at 65.0C' },
    ],
    locationId: 'advanced_lab',
  },
  {
    id: 'm6_4',
    levelId: 6,
    title: 'Genomic Target Binary Search',
    track: 'biotechnology',
    difficulty: 'hard',
    xpReward: 40,
    storyline: 'Implement a binary search algorithm to rapidly find a target molecular weight in a sorted gene catalog.',
    scientificContext: {
      domain: 'Core Computer Science',
      instrument: 'Genomic Index Engine',
      description: 'Logarithmic O(log N) binary search allows indexing gigabase human genome coordinates in sub-milliseconds.',
    },
    pythonTopic: 'Binary Search Algorithm',
    conceptExplanation: 'Binary search repeatedly divides the search interval in half on sorted arrays.',
    exampleCode: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    challengeInstructions: [
      'Given sorted weights = [120, 240, 310, 450, 520, 680, 890]',
      'Implement binary search to find the index of target 450',
      'Print the index',
    ],
    starterCode: `weights = [120, 240, 310, 450, 520, 680, 890]
target = 450

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search(weights, target))
`,
    solutionCode: `weights = [120, 240, 310, 450, 520, 680, 890]
target = 450

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search(weights, target))`,
    hints: ['450 is at index 3 in the sorted list'],
    testCases: [
      { id: 'tc6_4_1', description: 'Binary search index of 450', expectedOutput: '3' },
    ],
    locationId: 'advanced_lab',
  },
  {
    id: 'm6_5',
    levelId: 6,
    title: 'Viscosity Key-Sorting Pipeline',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Sort polymer samples by viscosity using Python custom key functions and lambdas.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Cone and Plate Rheometer',
      description: 'Rheological classification organizes polymers based on dynamic shear viscosity (mPa·s).',
    },
    pythonTopic: 'sorted() with lambda key',
    conceptExplanation: 'sorted(items, key=lambda x: x["metric"]) sorts dictionaries by specific attributes.',
    exampleCode: 'sorted_items = sorted(samples, key=lambda x: x["viscosity"])',
    challengeInstructions: [
      'Given polymers = [{"name": "P1", "viscosity": 450}, {"name": "P2", "viscosity": 120}, {"name": "P3", "viscosity": 890}]',
      'Sort by viscosity ascending',
      'Print the name of the highest viscosity polymer',
    ],
    starterCode: `polymers = [
    {"name": "P1", "viscosity": 450},
    {"name": "P2", "viscosity": 120},
    {"name": "P3", "viscosity": 890}
]

# Sort by viscosity and print the highest polymer's name:
sorted_p = sorted(polymers, key=lambda p: p["viscosity"])
print(sorted_p[-1]["name"])
`,
    solutionCode: `polymers = [
    {"name": "P1", "viscosity": 450},
    {"name": "P2", "viscosity": 120},
    {"name": "P3", "viscosity": 890}
]
sorted_p = sorted(polymers, key=lambda p: p["viscosity"])
print(sorted_p[-1]["name"])`,
    hints: ['Highest viscosity is 890, which belongs to "P3"'],
    testCases: [
      { id: 'tc6_5_1', description: 'Identify highest viscosity polymer', expectedOutput: 'P3' },
    ],
    locationId: 'advanced_lab',
  },

  // ==================== LEVEL 7: SCIENTIFIC PYTHON UNIVERSE ====================
  {
    id: 'm7_1',
    levelId: 7,
    title: 'Scientific Statistical Analysis',
    track: 'biotechnology',
    difficulty: 'easy',
    xpReward: 25,
    storyline: 'Compute statistical mean and variance across enzyme reaction rate replicates.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Stop-Flow Kinetic Spectrometer',
      description: 'Enzyme kinetics (Michaelis-Menten) requires statistical verification across replicates.',
    },
    pythonTopic: 'Statistical Modeling & List Comprehensions',
    conceptExplanation: 'Calculating variance: mean of squared differences from the sample mean.',
    exampleCode: `data = [10, 12, 14]
mean = sum(data) / len(data)
variance = sum((x - mean) ** 2 for x in data) / len(data)
print(round(variance, 2))`,
    challengeInstructions: [
      'Given rates = [14.2, 15.1, 13.9, 14.8, 15.0]',
      'Compute the mean',
      'Compute the variance: sum((x - mean)**2 for x in rates) / len(rates)',
      'Print the variance rounded to 3 decimal places using round(variance, 3)',
    ],
    starterCode: `rates = [14.2, 15.1, 13.9, 14.8, 15.0]

mean = sum(rates) / len(rates)
variance = sum((x - mean) ** 2 for x in rates) / len(rates)
print(round(variance, 3))
`,
    solutionCode: `rates = [14.2, 15.1, 13.9, 14.8, 15.0]
mean = sum(rates) / len(rates)
variance = sum((x - mean) ** 2 for x in rates) / len(rates)
print(round(variance, 3))`,
    hints: ['Mean is 14.6', 'Variance is 0.244'],
    testCases: [
      { id: 'tc7_1_1', description: 'Compute variance of rates rounded to 3 decimals', expectedOutput: '0.244' },
    ],
    locationId: 'computational_center',
  },
  {
    id: 'm7_2',
    levelId: 7,
    title: 'Stress-Strain Matrix Transformation',
    track: 'materials_science',
    difficulty: 'medium',
    xpReward: 30,
    storyline: 'Normalize stress tensor loads across multiple specimen planes.',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Multiaxial Load Cell Array',
      description: 'Von Mises yield criterion aggregates 3D stress tensors into an effective scalar stress.',
    },
    pythonTopic: '2D Arrays and Matrix Comprehensions',
    conceptExplanation: 'Nested lists [[...], [...]] model 2D matrices and tensors.',
    exampleCode: `matrix = [[10, 20], [30, 40]]
diag_sum = sum(matrix[i][i] for i in range(len(matrix)))
print(diag_sum)`,
    challengeInstructions: [
      'Given stress_tensor = [[120, 15, 0], [15, 80, 0], [0, 0, 40]]',
      'Compute the trace (sum of main diagonal elements: [0][0] + [1][1] + [2][2])',
      'Print the trace value',
    ],
    starterCode: `stress_tensor = [
    [120, 15, 0],
    [15, 80, 0],
    [0, 0, 40]
]

# Calculate trace (diagonal sum):
trace = sum(stress_tensor[i][i] for i in range(3))
print(trace)
`,
    solutionCode: `stress_tensor = [
    [120, 15, 0],
    [15, 80, 0],
    [0, 0, 40]
]
print(sum(stress_tensor[i][i] for i in range(3)))`,
    hints: ['120 + 80 + 40 = 240'],
    testCases: [
      { id: 'tc7_2_1', description: 'Diagonal trace of stress tensor', expectedOutput: '240' },
    ],
    locationId: 'computational_center',
  },
  {
    id: 'm7_3',
    levelId: 7,
    title: 'Microplate Absorbance Matrix Filter',
    track: 'biotechnology',
    difficulty: 'medium',
    xpReward: 30,
    storyline: 'Analyze a 96-well microplate layout and count how many wells exceed threshold OD 0.5.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: '96-Well Robotic Plate Reader',
      description: 'High-throughput drug screening filters active therapeutic compounds by hit threshold.',
    },
    pythonTopic: 'Nested Loops and Matrix Filtering',
    conceptExplanation: 'Iterating over 2D rows and columns to filter quantitative hits.',
    exampleCode: `plate = [[0.1, 0.6], [0.8, 0.2]]
hits = sum(1 for row in plate for val in row if val > 0.5)
print(hits)`,
    challengeInstructions: [
      'Given plate = [[0.12, 0.65, 0.23], [0.82, 0.15, 0.55], [0.08, 0.91, 0.44]]',
      'Count how many wells have value > 0.50',
      'Print the count',
    ],
    starterCode: `plate = [
    [0.12, 0.65, 0.23],
    [0.82, 0.15, 0.55],
    [0.08, 0.91, 0.44]
]

# Count wells with value > 0.50:
hits = sum(1 for row in plate for val in row if val > 0.50)
print(hits)
`,
    solutionCode: `plate = [
    [0.12, 0.65, 0.23],
    [0.82, 0.15, 0.55],
    [0.08, 0.91, 0.44]
]
print(sum(1 for row in plate for val in row if val > 0.50))`,
    hints: ['Hits: 0.65, 0.82, 0.55, 0.91 -> 4 wells'],
    testCases: [
      { id: 'tc7_3_1', description: 'Count wells > 0.50 (4 hits)', expectedOutput: '4' },
    ],
    locationId: 'computational_center',
  },
  {
    id: 'm7_4',
    levelId: 7,
    title: 'Thermal Conductivity Vector Normalization',
    track: 'materials_science',
    difficulty: 'hard',
    xpReward: 35,
    storyline: 'Compute Euclidean L2 norm of anisotropic thermal conductivity vector [kx, ky, kz].',
    scientificContext: {
      domain: 'Materials Science',
      instrument: 'Laser Flash Thermal Diffusivity System',
      description: 'Graphene and 2D materials display extreme directional thermal conductivity anisotropy.',
      realWorldFormula: '||k|| = sqrt(kx^2 + ky^2 + kz^2)',
    },
    pythonTopic: 'math module and Vector Norms',
    conceptExplanation: 'import math provides math.sqrt() and power functions.',
    exampleCode: `import math
k = [3.0, 4.0, 0.0]
norm = math.sqrt(sum(x**2 for x in k))
print(norm)`,
    challengeInstructions: [
      'Import math',
      'Given k = [30.0, 40.0, 0.0]',
      'Calculate Euclidean norm = math.sqrt(k[0]**2 + k[1]**2 + k[2]**2)',
      'Print the norm',
    ],
    starterCode: `import math

k = [30.0, 40.0, 0.0]

# Calculate Euclidean norm:
norm = math.sqrt(sum(x**2 for x in k))
print(norm)
`,
    solutionCode: `import math
k = [30.0, 40.0, 0.0]
print(math.sqrt(sum(x**2 for x in k)))`,
    hints: ['sqrt(900 + 1600 + 0) = sqrt(2500) = 50.0'],
    testCases: [
      { id: 'tc7_4_1', description: 'Euclidean norm of [30, 40, 0]', expectedOutput: '50.0' },
    ],
    locationId: 'computational_center',
  },
  {
    id: 'm7_5',
    levelId: 7,
    title: 'Sliding Window GC-Content Profiler',
    track: 'biotechnology',
    difficulty: 'hard',
    xpReward: 40,
    storyline: 'Scan a genomic scaffold with a sliding window of length 4 to find highest GC percentage region.',
    scientificContext: {
      domain: 'Biotechnology',
      instrument: 'Whole Genome Assembler',
      description: 'Sliding window algorithms locate CpG islands indicating gene promoter regions.',
    },
    pythonTopic: 'Sliding Window Algorithm',
    conceptExplanation: 'Extracting substrings seq[i:i+window] to evaluate local density.',
    exampleCode: `window = 4
best_gc = 0
for i in range(len(seq) - window + 1):
    sub = seq[i:i+window]
    gc = (sub.count("G") + sub.count("C")) / window * 100
    if gc > best_gc:
        best_gc = gc`,
    challengeInstructions: [
      'Given genome = "ATATGCGCATAT"',
      'Scan with window size 4',
      'Find the maximum GC percentage in any window',
      'Print the maximum GC percentage (as float or int)',
    ],
    starterCode: `genome = "ATATGCGCATAT"
window = 4

max_gc = 0.0
for i in range(len(genome) - window + 1):
    sub = genome[i:i+window]
    gc = (sub.count("G") + sub.count("C")) / window * 100
    if gc > max_gc:
        max_gc = gc

print(max_gc)
`,
    solutionCode: `genome = "ATATGCGCATAT"
window = 4
max_gc = 0.0
for i in range(len(genome) - window + 1):
    sub = genome[i:i+window]
    gc = (sub.count("G") + sub.count("C")) / window * 100
    if gc > max_gc:
        max_gc = gc
print(max_gc)`,
    hints: ['Window "GCGC" contains 100% GC'],
    testCases: [
      { id: 'tc7_5_1', description: 'Max GC content in window 4', expectedOutput: '100.0' },
    ],
    locationId: 'computational_center',
  },

  // ==================== BOSS: THE NEXUS CORE FAILURE ====================
  {
    id: 'boss_core',
    levelId: 8,
    title: 'The Nexus Core Failure',
    track: 'boss',
    difficulty: 'boss',
    xpReward: 250,
    storyline: 'CRITICAL ALERT: The Central Research Nexus Core has destabilized. Reactor containment fields are collapsing. Synthesize the unified reactor stabilization code to reboot the universe.',
    scientificContext: {
      domain: 'Core Computer Science',
      instrument: 'Nexus Quantum Fusion Core',
      description: 'The core requires 5 sequential system diagnostics: calculate core temperature delta, verify DNA stabilizer sequence, filter corrupted alloy isotopes, compute containment flux, and trigger magnetic seal.',
    },
    pythonTopic: 'Master Synthesis Challenge',
    conceptExplanation: 'Combine variables, conditionals, loops, data structures, and functions into a single restoration script.',
    exampleCode: `# Full Nexus Master script`,
    challengeInstructions: [
      '1. Calculate temperature margin: temp = 1500 - 850',
      '2. Count "G" bases in sequence "GGATCGCGG": g_count = "GGATCGCGG".count("G")',
      '3. Average alloy mass: masses = [20, 30, 40]; avg_mass = sum(masses)/len(masses)',
      '4. If temp == 650 and g_count == 5 and avg_mass == 30.0:',
      '   Print "NEXUS_CORE_RESTORED"',
      '   Otherwise print "STABILIZATION_FAILED"',
    ],
    starterCode: `# THE FINAL BOSS: THE NEXUS CORE FAILURE
# Restore the central core by validating all subsystems:

temp = 1500 - 850
g_count = "GGATCGCGG".count("G")
masses = [20, 30, 40]
avg_mass = sum(masses) / len(masses)

if temp == 650 and g_count == 5 and avg_mass == 30.0:
    print("NEXUS_CORE_RESTORED")
else:
    print("STABILIZATION_FAILED")
`,
    solutionCode: `temp = 1500 - 850
g_count = "GGATCGCGG".count("G")
masses = [20, 30, 40]
avg_mass = sum(masses) / len(masses)

if temp == 650 and g_count == 5 and avg_mass == 30.0:
    print("NEXUS_CORE_RESTORED")
else:
    print("STABILIZATION_FAILED")`,
    hints: [
      'temp = 1500 - 850 (650)',
      'g_count = "GGATCGCGG".count("G") (5)',
      'avg_mass = sum(masses) / len(masses) (30.0)',
      'When all three pass, print "NEXUS_CORE_RESTORED"',
    ],
    testCases: [
      {
        id: 'tc_boss_1',
        description: 'Execute complete reactor stabilization protocol',
        expectedOutput: 'NEXUS_CORE_RESTORED',
      },
    ],
    locationId: 'nexus_core',
  },
];
