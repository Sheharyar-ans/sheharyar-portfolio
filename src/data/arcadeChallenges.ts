export type GameMode = 'puzzle' | 'fighter';
export type LanguageType = 'python' | 'javascript' | 'react' | 'html_css' | 'api_json';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// -------------------------------------------------------------
// PUZZLE MODE TYPES & DEFINITIONS
// -------------------------------------------------------------
export interface GridPosition {
  x: number;
  y: number;
}

export interface PuzzleLayout {
  gridSize: number; // e.g. 5 for 5x5, 6 for 6x6, 7 for 7x7
  start: GridPosition;
  goal: GridPosition;
  walls: GridPosition[];
  key?: GridPosition;
  lasers?: GridPosition[];
}

export interface PuzzleChallenge {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  language: LanguageType;
  instructions: string;
  syntaxGuide: string;
  starterComment: string;
  layout: PuzzleLayout;
  hint: string;
  defaultCommands: string[];
}

// -------------------------------------------------------------
// FIGHTER MODE TYPES & DEFINITIONS
// -------------------------------------------------------------
export interface FighterChallenge {
  id: string;
  title: string;
  bossName: string;
  bossTitle: string;
  difficulty: DifficultyLevel;
  language: LanguageType;
  story: string;
  task: string;
  starterComment: string;
  testCases: Array<{
    input: any;
    expected: any;
    displayInput: string;
    displayExpected: string;
  }>;
  hint: string;
  targetFunction: string;
  damage: number;
}

// -------------------------------------------------------------
// PUZZLE CHALLENGES REPOSITORY (ORGANIZED BY LANGUAGE & DIFFICULTY)
// -------------------------------------------------------------
export const PUZZLE_CHALLENGES: Record<LanguageType, Record<DifficultyLevel, PuzzleChallenge[]>> = {
  javascript: {
    easy: [
      {
        id: 'js-puz-e1',
        title: 'Sector Alpha: Direct Vector Override',
        difficulty: 'easy',
        language: 'javascript',
        instructions: 'Guide the drone to the extraction portal at coordinates (3, 2). Navigate around the barrier wall.',
        syntaxGuide: 'Commands available: bot.right(steps), bot.left(steps), bot.up(steps), bot.down(steps)',
        starterComment: '// Write your bot navigation commands below:\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          goal: { x: 3, y: 2 },
          walls: [{ x: 1, y: 0 }, { x: 1, y: 1 }]
        },
        hint: 'Move down 2 steps first, then move right 3 steps: bot.down(2); bot.right(3);',
        defaultCommands: ['down', 'down', 'right', 'right', 'right']
      },
      {
        id: 'js-puz-e2',
        title: 'Sector Beta: Power Core Retrieval',
        difficulty: 'easy',
        language: 'javascript',
        instructions: 'Collect the cyber-key at (2, 0) before entering the locked exit portal at (4, 1).',
        syntaxGuide: 'Commands: bot.right(steps), bot.left(steps), bot.down(steps), bot.up(steps), bot.collectKey()',
        starterComment: '// Write your code below to retrieve key and unlock portal:\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          key: { x: 2, y: 0 },
          goal: { x: 4, y: 1 },
          walls: [{ x: 2, y: 1 }, { x: 3, y: 1 }]
        },
        hint: 'Move right 2 steps, collect the key, then move right 2 more and down 1: bot.right(2); bot.collectKey(); bot.right(2); bot.down(1);',
        defaultCommands: ['right', 'right', 'collect', 'right', 'right', 'down']
      }
    ],
    medium: [
      {
        id: 'js-puz-m1',
        title: 'Sector Gamma: Laser Perimeter Navigation',
        difficulty: 'medium',
        language: 'javascript',
        instructions: 'Navigate through the labyrinth corridor avoiding active laser barriers at (2, 2) and (3, 2). Retrieve the access card at (1, 3) and reach (5, 4).',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.left(n), bot.up(n), bot.collectKey()',
        starterComment: '// Program your path avoiding red laser emitters:\n',
        layout: {
          gridSize: 6,
          start: { x: 0, y: 0 },
          key: { x: 1, y: 3 },
          goal: { x: 5, y: 4 },
          walls: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
          lasers: [{ x: 2, y: 2 }, { x: 3, y: 2 }]
        },
        hint: 'Drop down along column 0, grab the key at (1, 3), then navigate around column 4 to reach the goal.',
        defaultCommands: ['down', 'down', 'down', 'right', 'collect', 'down', 'right', 'right', 'right', 'right', 'up']
      }
    ],
    hard: [
      {
        id: 'js-puz-h1',
        title: 'Sector Omega: Quantum Firewall Maze',
        difficulty: 'hard',
        language: 'javascript',
        instructions: 'Complex multi-corridor firewall. Collect the authorization token at (3, 5) and reach the quantum teleporter at (6, 0) without triggering security lasers.',
        syntaxGuide: 'Looping commands supported: for (let i = 0; i < n; i++) { bot.right(); } or bot.right(n)',
        starterComment: '// Program optimized navigation sequence:\n',
        layout: {
          gridSize: 7,
          start: { x: 0, y: 6 },
          key: { x: 3, y: 5 },
          goal: { x: 6, y: 0 },
          walls: [{ x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }],
          lasers: [{ x: 2, y: 4 }, { x: 4, y: 4 }]
        },
        hint: 'Use loops to traverse corridors cleanly: for(let i=0; i<3; i++) bot.up(); then navigate across to key.',
        defaultCommands: ['up', 'up', 'up', 'right', 'right', 'right', 'down', 'collect', 'up', 'up', 'right', 'right', 'right', 'up', 'up']
      }
    ]
  },
  python: {
    easy: [
      {
        id: 'py-puz-e1',
        title: 'Python Sector 01: Vector Thruster Alignment',
        difficulty: 'easy',
        language: 'python',
        instructions: 'Steer the bot from (0, 0) to the charging dock at (3, 3) bypassing the asteroid walls.',
        syntaxGuide: 'Commands: bot.right(n), bot.left(n), bot.down(n), bot.up(n)',
        starterComment: '# Write your Python navigation code below:\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          goal: { x: 3, y: 3 },
          walls: [{ x: 1, y: 1 }, { x: 2, y: 2 }]
        },
        hint: 'Move right 3 times then down 3 times: bot.right(3); bot.down(3)',
        defaultCommands: ['right', 'right', 'right', 'down', 'down', 'down']
      }
    ],
    medium: [
      {
        id: 'py-puz-m1',
        title: 'Python Sector 02: Iterative Security Bypass',
        difficulty: 'medium',
        language: 'python',
        instructions: 'Use a Python for-loop or directional commands to guide the bot through the switch grid to collect the security key and enter the portal.',
        syntaxGuide: 'Commands: bot.right(steps), bot.down(steps), bot.collect_key()',
        starterComment: '# Use loops or direct commands to bypass security:\n',
        layout: {
          gridSize: 6,
          start: { x: 0, y: 1 },
          key: { x: 2, y: 4 },
          goal: { x: 5, y: 2 },
          walls: [{ x: 2, y: 2 }, { x: 3, y: 2 }],
          lasers: [{ x: 1, y: 3 }]
        },
        hint: 'bot.down(3); bot.right(2); bot.collect_key(); bot.up(2); bot.right(3)',
        defaultCommands: ['down', 'down', 'down', 'right', 'right', 'collect', 'up', 'up', 'right', 'right', 'right']
      }
    ],
    hard: [
      {
        id: 'py-puz-h1',
        title: 'Python Sector 03: Algorithmic Matrix Traversal',
        difficulty: 'hard',
        language: 'python',
        instructions: 'Traverse the 7x7 firewall grid from (0, 0) to (6, 6). Avoid active laser sensors at (2, 3), (3, 3), and collect the encryption cipher at (5, 1).',
        syntaxGuide: 'bot.right(n), bot.down(n), bot.up(n), bot.left(n), bot.collect_key()',
        starterComment: '# Write comprehensive Python trajectory:\n',
        layout: {
          gridSize: 7,
          start: { x: 0, y: 0 },
          key: { x: 5, y: 1 },
          goal: { x: 6, y: 6 },
          walls: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }],
          lasers: [{ x: 2, y: 3 }, { x: 3, y: 3 }]
        },
        hint: 'Move along the top border to x=5, drop down to collect key, then proceed through the open right flank.',
        defaultCommands: ['right', 'right', 'right', 'right', 'right', 'down', 'collect', 'down', 'down', 'down', 'down', 'down', 'right']
      }
    ]
  },
  react: {
    easy: [
      {
        id: 'react-puz-e1',
        title: 'React State Path: Dispatch Movement',
        difficulty: 'easy',
        language: 'react',
        instructions: 'Simulate state action dispatches to move the player component from (0, 0) to (3, 1).',
        syntaxGuide: 'Dispatch syntax: dispatch({ type: "MOVE_RIGHT", steps: 3 }); dispatch({ type: "MOVE_DOWN", steps: 1 }); OR bot.right(3); bot.down(1);',
        starterComment: '// Dispatch state transitions to relocate component:\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          goal: { x: 3, y: 1 },
          walls: [{ x: 1, y: 0 }]
        },
        hint: 'bot.down(1); bot.right(3);',
        defaultCommands: ['down', 'right', 'right', 'right']
      }
    ],
    medium: [
      {
        id: 'react-puz-m1',
        title: 'React Hook Cycle: Key Collector Component',
        difficulty: 'medium',
        language: 'react',
        instructions: 'Trigger state updates to collect props key at (2, 2) and mount in target portal container at (4, 4).',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.collectKey()',
        starterComment: '// Execute component lifecycle trajectory:\n',
        layout: {
          gridSize: 6,
          start: { x: 0, y: 0 },
          key: { x: 2, y: 2 },
          goal: { x: 4, y: 4 },
          walls: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
          lasers: [{ x: 2, y: 3 }]
        },
        hint: 'bot.right(2); bot.down(2); bot.collectKey(); bot.right(2); bot.down(2);',
        defaultCommands: ['right', 'right', 'down', 'down', 'collect', 'right', 'right', 'down', 'down']
      }
    ],
    hard: [
      {
        id: 'react-puz-h1',
        title: 'React Reducer Labyrinth: Full Re-render Matrix',
        difficulty: 'hard',
        language: 'react',
        instructions: 'Execute full reducer steps across the 7x7 tree, fetching the key token at (1, 5) and unlocking the root portal at (6, 1).',
        syntaxGuide: 'bot.down(n), bot.right(n), bot.up(n), bot.collectKey()',
        starterComment: '// Program immutable state transitions:\n',
        layout: {
          gridSize: 7,
          start: { x: 0, y: 0 },
          key: { x: 1, y: 5 },
          goal: { x: 6, y: 1 },
          walls: [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
          lasers: [{ x: 4, y: 3 }, { x: 5, y: 3 }]
        },
        hint: 'Drop down column 0, take key at (1, 5), move across the bottom and ascend column 6 to goal.',
        defaultCommands: ['down', 'down', 'down', 'down', 'down', 'right', 'collect', 'right', 'right', 'right', 'right', 'right', 'up', 'up', 'up', 'up']
      }
    ]
  },
  html_css: {
    easy: [
      {
        id: 'css-puz-e1',
        title: 'CSS Grid Navigation: Coordinate Placement',
        difficulty: 'easy',
        language: 'html_css',
        instructions: 'Route the grid element from row 0, col 0 to the target grid cell at (2, 3) around the border.',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.left(n), bot.up(n)',
        starterComment: '/* Write grid positioning path commands: */\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          goal: { x: 2, y: 3 },
          walls: [{ x: 1, y: 1 }, { x: 2, y: 1 }]
        },
        hint: 'bot.down(3); bot.right(2);',
        defaultCommands: ['down', 'down', 'down', 'right', 'right']
      }
    ],
    medium: [
      {
        id: 'css-puz-m1',
        title: 'CSS Flex Alignment: Escape Flow',
        difficulty: 'medium',
        language: 'html_css',
        instructions: 'Collect CSS variable token at (3, 1) and align into portal at (5, 3).',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.collectKey()',
        starterComment: '/* Align element along flex track: */\n',
        layout: {
          gridSize: 6,
          start: { x: 0, y: 0 },
          key: { x: 3, y: 1 },
          goal: { x: 5, y: 3 },
          walls: [{ x: 2, y: 0 }, { x: 2, y: 2 }],
          lasers: [{ x: 3, y: 2 }]
        },
        hint: 'bot.down(1); bot.right(3); bot.collectKey(); bot.right(2); bot.down(2);',
        defaultCommands: ['down', 'right', 'right', 'right', 'collect', 'right', 'right', 'down', 'down']
      }
    ],
    hard: [
      {
        id: 'css-puz-h1',
        title: 'CSS 3D Transform Maze: Matrix3D',
        difficulty: 'hard',
        language: 'html_css',
        instructions: 'Navigate the complete transform boundary. Obtain neon style sheet key at (2, 5) and reach target viewport at (6, 6).',
        syntaxGuide: 'bot.right(n), bot.down(n), bot.collectKey()',
        starterComment: '/* Compute transform trajectory: */\n',
        layout: {
          gridSize: 7,
          start: { x: 0, y: 2 },
          key: { x: 2, y: 5 },
          goal: { x: 6, y: 6 },
          walls: [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
          lasers: [{ x: 4, y: 4 }, { x: 4, y: 5 }]
        },
        hint: 'Drop down along column 0 to y=5, move right to key at (2, 5), then go down to row 6 and traverse right to (6, 6).',
        defaultCommands: ['down', 'down', 'down', 'right', 'right', 'collect', 'down', 'right', 'right', 'right', 'right']
      }
    ]
  },
  api_json: {
    easy: [
      {
        id: 'api-puz-e1',
        title: 'API Routing: Path Parameter Forwarding',
        difficulty: 'easy',
        language: 'api_json',
        instructions: 'Route incoming packet to endpoint at (3, 2) without packet dropping on dead gateway walls.',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.left(n), bot.up(n)',
        starterComment: '// Route packet through network grid:\n',
        layout: {
          gridSize: 5,
          start: { x: 0, y: 0 },
          goal: { x: 3, y: 2 },
          walls: [{ x: 1, y: 0 }, { x: 2, y: 0 }]
        },
        hint: 'bot.down(2); bot.right(3);',
        defaultCommands: ['down', 'down', 'right', 'right', 'right']
      }
    ],
    medium: [
      {
        id: 'api-puz-m1',
        title: 'API Auth Hop: Bearer Token Handshake',
        difficulty: 'medium',
        language: 'api_json',
        instructions: 'Collect JWT token key at (1, 4) and dispatch to secure webhook portal at (4, 1).',
        syntaxGuide: 'Commands: bot.right(n), bot.down(n), bot.collectKey()',
        starterComment: '// Fetch auth token and deliver to webhook receiver:\n',
        layout: {
          gridSize: 6,
          start: { x: 0, y: 0 },
          key: { x: 1, y: 4 },
          goal: { x: 4, y: 1 },
          walls: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
          lasers: [{ x: 2, y: 3 }]
        },
        hint: 'bot.down(4); bot.right(1); bot.collectKey(); bot.right(3); bot.up(3);',
        defaultCommands: ['down', 'down', 'down', 'down', 'right', 'collect', 'right', 'right', 'right', 'up', 'up', 'up']
      }
    ],
    hard: [
      {
        id: 'api-puz-h1',
        title: 'API Pipeline: Distributed Microservice Mesh',
        difficulty: 'hard',
        language: 'api_json',
        instructions: 'Navigate high-throughput proxy grid. Collect rate-limit bypass key at (5, 5) and reach destination DB cluster at (6, 0).',
        syntaxGuide: 'bot.right(n), bot.down(n), bot.up(n), bot.collectKey()',
        starterComment: '// Dispatch multi-hop proxy packet:\n',
        layout: {
          gridSize: 7,
          start: { x: 0, y: 6 },
          key: { x: 5, y: 5 },
          goal: { x: 6, y: 0 },
          walls: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }],
          lasers: [{ x: 3, y: 4 }, { x: 4, y: 4 }]
        },
        hint: 'Traverse along the bottom to (5, 5) for key, then proceed up column 6 to goal.',
        defaultCommands: ['down', 'right', 'right', 'right', 'right', 'right', 'collect', 'up', 'up', 'up', 'up', 'up', 'right', 'up']
      }
    ]
  }
};

// -------------------------------------------------------------
// FIGHTER COMBAT CHALLENGES REPOSITORY (1v1 CODING COMBAT)
// -------------------------------------------------------------
export const FIGHTER_CHALLENGES: Record<LanguageType, Record<DifficultyLevel, FighterChallenge[]>> = {
  javascript: {
    easy: [
      {
        id: 'js-fig-e1',
        title: 'Plasma Strike: Array Multiplier',
        bossName: 'SYNTAX_TITAN',
        bossTitle: 'Compiler Firewall Golem',
        difficulty: 'easy',
        language: 'javascript',
        story: 'Syntax Titan is charging a shield overload. Write a function calculateDamage(baseHits, multiplier) that multiplies each hit by the multiplier and returns the total sum to break his stance!',
        task: 'Complete function calculateDamage(baseHits, multiplier) -> number',
        starterComment: '// Write your function calculateDamage below:\n',
        testCases: [
          { input: [[10, 20, 30], 2], expected: 120, displayInput: '([10, 20, 30], 2)', displayExpected: '120' },
          { input: [[5, 5, 10], 3], expected: 60, displayInput: '([5, 5, 10], 3)', displayExpected: '60' },
          { input: [[0, 15], 4], expected: 60, displayInput: '([0, 15], 4)', displayExpected: '60' }
        ],
        hint: 'Use baseHits.reduce((acc, curr) => acc + curr * multiplier, 0);',
        targetFunction: 'calculateDamage',
        damage: 40
      },
      {
        id: 'js-fig-e2',
        title: 'EMP Pulse: Positive Surge Filter',
        bossName: 'CORRUPTED_BOT_V2',
        bossTitle: 'Rogue Drone Vanguard',
        difficulty: 'easy',
        language: 'javascript',
        story: 'Filter out the negative energy interference so the plasma cannon can lock onto the drone core!',
        task: 'Complete function filterEnergies(energies) returning array of numbers >= 0',
        starterComment: '// Complete function filterEnergies(energies):\n',
        testCases: [
          { input: [[-10, 50, -5, 80, 0]], expected: [50, 80, 0], displayInput: '([-10, 50, -5, 80, 0])', displayExpected: '[50, 80, 0]' },
          { input: [[-1, -2, -3]], expected: [], displayInput: '([-1, -2, -3])', displayExpected: '[]' }
        ],
        hint: 'return energies.filter(e => e >= 0);',
        targetFunction: 'filterEnergies',
        damage: 45
      }
    ],
    medium: [
      {
        id: 'js-fig-m1',
        title: 'Cyber Blade: Decryption Inverter',
        bossName: 'NULL_POINTER_SHADOW',
        bossTitle: 'Memory Leak Assassin',
        difficulty: 'medium',
        language: 'javascript',
        story: 'The Null Pointer Shadow cloaks in encrypted binary. Reverse the cipher string and append the weapon suffix "-SLASH" to execute a surprise critical strike!',
        task: 'Complete function decryptStrike(cipher) -> reversed cipher + "-SLASH"',
        starterComment: '// Complete function decryptStrike(cipher):\n',
        testCases: [
          { input: ['NEON'], expected: 'NOEN-SLASH', displayInput: '("NEON")', displayExpected: '"NOEN-SLASH"' },
          { input: ['CYBER'], expected: 'REBYC-SLASH', displayInput: '("CYBER")', displayExpected: '"REBYC-SLASH"' }
        ],
        hint: 'return cipher.split("").reverse().join("") + "-SLASH";',
        targetFunction: 'decryptStrike',
        damage: 55
      }
    ],
    hard: [
      {
        id: 'js-fig-h1',
        title: 'Quantum Overdrive: Duplicate Purge Wave',
        bossName: 'INFINITE_LOOP_DEMON',
        bossTitle: 'Recursion World Destroyer',
        difficulty: 'hard',
        language: 'javascript',
        story: 'The Infinite Loop Demon clones himself infinitely. Write a function purgeDemonClones(clones) that returns unique clone IDs sorted in descending numerical order!',
        task: 'Complete function purgeDemonClones(clones) -> unique numbers sorted high-to-low',
        starterComment: '// Complete function purgeDemonClones(clones):\n',
        testCases: [
          { input: [[4, 2, 8, 4, 2, 10, 8]], expected: [10, 8, 4, 2], displayInput: '([4, 2, 8, 4, 2, 10, 8])', displayExpected: '[10, 8, 4, 2]' },
          { input: [[1, 1, 1, 5, 3]], expected: [5, 3, 1], displayInput: '([1, 1, 1, 5, 3])', displayExpected: '[5, 3, 1]' }
        ],
        hint: 'return [...new Set(clones)].sort((a, b) => b - a);',
        targetFunction: 'purgeDemonClones',
        damage: 75
      }
    ]
  },
  python: {
    easy: [
      {
        id: 'py-fig-e1',
        title: 'Python Strike: Apex Altitude Calculator',
        bossName: 'BYTE_VIPER',
        bossTitle: 'Algorithmic Serpent',
        difficulty: 'easy',
        language: 'python',
        story: 'Byte Viper strikes from the highest frequency. Write a Python function find_highest_signal(signals) to locate his apex coordinate!',
        task: 'def find_highest_signal(signals): return max value or 0 if empty',
        starterComment: '# Define find_highest_signal(signals) below:\n',
        testCases: [
          { input: [[120, 850, 430, 990]], expected: 990, displayInput: '([120, 850, 430, 990])', displayExpected: '990' },
          { input: [[]], expected: 0, displayInput: '([])', displayExpected: '0' }
        ],
        hint: 'return max(signals) if signals else 0',
        targetFunction: 'find_highest_signal',
        damage: 40
      }
    ],
    medium: [
      {
        id: 'py-fig-m1',
        title: 'Python Counter: Anomaly Counter-Attack',
        bossName: 'DATA_GRIFFIN',
        bossTitle: 'Vector Sky Marauder',
        difficulty: 'medium',
        language: 'python',
        story: 'Data Griffin scatters anomaly bursts. Count the frequency of each error code and return the count of "CRITICAL" anomalies to calibrate your railgun!',
        task: 'def count_critical(codes): return count of "CRITICAL"',
        starterComment: '# Define count_critical(codes) below:\n',
        testCases: [
          { input: [['CRITICAL', 'WARN', 'CRITICAL', 'INFO']], expected: 2, displayInput: '(["CRITICAL", "WARN", "CRITICAL", "INFO"])', displayExpected: '2' },
          { input: [['INFO', 'WARN']], expected: 0, displayInput: '(["INFO", "WARN"])', displayExpected: '0' }
        ],
        hint: 'return codes.count("CRITICAL")',
        targetFunction: 'count_critical',
        damage: 55
      }
    ],
    hard: [
      {
        id: 'py-fig-h1',
        title: 'Python Finisher: Prime Shield Piercer',
        bossName: 'MEGABYTE_LEVIATHAN',
        bossTitle: 'Ancient Core Overlord',
        difficulty: 'hard',
        language: 'python',
        story: 'The Leviathan is protected by non-prime frequencies. Write is_prime_shield(n) returning True if n is prime, False otherwise.',
        task: 'def is_prime_shield(n): return True if prime, False if not',
        starterComment: '# Define is_prime_shield(n) below:\n',
        testCases: [
          { input: [13], expected: true, displayInput: '(13)', displayExpected: 'True' },
          { input: [12], expected: false, displayInput: '(12)', displayExpected: 'False' },
          { input: [1], expected: false, displayInput: '(1)', displayExpected: 'False' }
        ],
        hint: 'if n < 2: return False; check range(2, int(n**0.5)+1)',
        targetFunction: 'is_prime_shield',
        damage: 80
      }
    ]
  },
  react: {
    easy: [
      {
        id: 'react-fig-e1',
        title: 'React Blast: Health Clamper Reducer',
        bossName: 'GLITCH_WARRIOR',
        bossTitle: 'Uncontrolled Component Golem',
        difficulty: 'easy',
        language: 'react',
        story: 'Glitch Warrior overflows memory buffers. Write a function clampHealth(current, change) that ensures health stays between 0 and 100.',
        task: 'Complete function clampHealth(current, change) -> clamped integer (0-100)',
        starterComment: '// Complete function clampHealth(current, change):\n',
        testCases: [
          { input: [90, 20], expected: 100, displayInput: '(90, 20)', displayExpected: '100' },
          { input: [10, -25], expected: 0, displayInput: '(10, -25)', displayExpected: '0' },
          { input: [50, 15], expected: 65, displayInput: '(50, 15)', displayExpected: '65' }
        ],
        hint: 'return Math.max(0, Math.min(100, current + change));',
        targetFunction: 'clampHealth',
        damage: 45
      }
    ],
    medium: [
      {
        id: 'react-fig-m1',
        title: 'React Burst: Badge String Compiler',
        bossName: 'PROP_DRILLER',
        bossTitle: 'Cascading Render Phantom',
        difficulty: 'medium',
        language: 'react',
        story: 'Compile the attack JSX element string to rupture the Prop Driller hierarchy!',
        task: 'function renderAttackBadge(name, tier) -> `<span class="badge-${tier}">${name}</span>`',
        starterComment: '// Write renderAttackBadge(name, tier) below:\n',
        testCases: [
          { input: ['Plasma', 'gold'], expected: '<span class="badge-gold">Plasma</span>', displayInput: '("Plasma", "gold")', displayExpected: '"<span class=\\"badge-gold\\">Plasma</span>"' }
        ],
        hint: 'return `<span class="badge-${tier}">${name}</span>`;',
        targetFunction: 'renderAttackBadge',
        damage: 55
      }
    ],
    hard: [
      {
        id: 'react-fig-h1',
        title: 'React Overload: Action Dispatcher',
        bossName: 'RACE_CONDITION_ARCHON',
        bossTitle: 'Async Thread Corruptor',
        difficulty: 'hard',
        language: 'react',
        story: 'The Archon corrupts async state. Complete combatReducer(state, action) where action "ATTACK" increases hits by action.amount and "CRIT" doubles hits.',
        task: 'combatReducer(state, action) -> next immutable state object',
        starterComment: '// Complete function combatReducer(state, action):\n',
        testCases: [
          { input: [{ hits: 10 }, { type: 'ATTACK', amount: 5 }], expected: { hits: 15 }, displayInput: '({ hits: 10 }, { type: "ATTACK", amount: 5 })', displayExpected: '{ hits: 15 }' },
          { input: [{ hits: 15 }, { type: 'CRIT' }], expected: { hits: 30 }, displayInput: '({ hits: 15 }, { type: "CRIT" })', displayExpected: '{ hits: 30 }' }
        ],
        hint: 'if (action.type === "ATTACK") return { ...state, hits: state.hits + action.amount }; if (action.type === "CRIT") return { ...state, hits: state.hits * 2 };',
        targetFunction: 'combatReducer',
        damage: 75
      }
    ]
  },
  html_css: {
    easy: [
      {
        id: 'css-fig-e1',
        title: 'CSS Punch: Centering Declarations',
        bossName: 'FLOAT_COLLAPSE_FIEND',
        bossTitle: 'Legacy Layout Troll',
        difficulty: 'easy',
        language: 'html_css',
        story: 'Banish the float layout fiend by returning an object with the 3 canonical flex centering properties!',
        task: 'function getFlexCenter() -> { display: "flex", justifyContent: "center", alignItems: "center" }',
        starterComment: '/* Complete function getFlexCenter() below: */\n',
        testCases: [
          { input: [], expected: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, displayInput: '()', displayExpected: '{ display: "flex", ... }' }
        ],
        hint: 'return { display: "flex", justifyContent: "center", alignItems: "center" };',
        targetFunction: 'getFlexCenter',
        damage: 40
      }
    ],
    medium: [
      {
        id: 'css-fig-m1',
        title: 'CSS Laser: Neon Shadow String',
        bossName: 'Z_INDEX_NIGHTMARE',
        bossTitle: 'Stacking Context Spectre',
        difficulty: 'medium',
        language: 'html_css',
        story: 'Illuminate the shadow realm with a double neon glow string to banish the Z-Index Spectre!',
        task: 'function makeGlow(color, px) -> `0 0 ${px}px ${color}, 0 0 ${px*2}px ${color}`',
        starterComment: '/* Complete function makeGlow(color, px): */\n',
        testCases: [
          { input: ['#B7FF3C', 10], expected: '0 0 10px #B7FF3C, 0 0 20px #B7FF3C', displayInput: '("#B7FF3C", 10)', displayExpected: '"0 0 10px #B7FF3C, 0 0 20px #B7FF3C"' }
        ],
        hint: 'return `0 0 ${px}px ${color}, 0 0 ${px*2}px ${color}`;',
        targetFunction: 'makeGlow',
        damage: 55
      }
    ],
    hard: [
      {
        id: 'css-fig-h1',
        title: 'CSS Storm: Fluid Clamp Synthesizer',
        bossName: 'VIEWPORT_DEVOURER',
        bossTitle: 'Multi-Resolution Behemoth',
        difficulty: 'hard',
        language: 'html_css',
        story: 'Calibrate fluid typography formula to defeat the Viewport Devourer across mobile and ultrawide displays!',
        task: 'function makeClamp(min, val, max) -> `clamp(${min}rem, ${val}vw, ${max}rem)`',
        starterComment: '/* Complete function makeClamp(min, val, max): */\n',
        testCases: [
          { input: [1, 4, 3], expected: 'clamp(1rem, 4vw, 3rem)', displayInput: '(1, 4, 3)', displayExpected: '"clamp(1rem, 4vw, 3rem)"' }
        ],
        hint: 'return `clamp(${min}rem, ${val}vw, ${max}rem)`;',
        targetFunction: 'makeClamp',
        damage: 75
      }
    ]
  },
  api_json: {
    easy: [
      {
        id: 'api-fig-e1',
        title: 'API Strike: Token Extractor',
        bossName: 'AUTH_GATE_SENTINEL',
        bossTitle: 'HTTP 401 Enforcer',
        difficulty: 'easy',
        language: 'api_json',
        story: 'Extract the bearer token from the HTTP Authorization header string to bypass the sentinel shield!',
        task: 'function getBearer(header) -> stripped token or empty string if invalid',
        starterComment: '// Complete function getBearer(header):\n',
        testCases: [
          { input: ['Bearer secret_token_99'], expected: 'secret_token_99', displayInput: '("Bearer secret_token_99")', displayExpected: '"secret_token_99"' },
          { input: ['Basic dXNlcjpwYXNz'], expected: '', displayInput: '("Basic dXNlcjpwYXNz")', displayExpected: '""' }
        ],
        hint: 'if (!header.startsWith("Bearer ")) return ""; return header.replace("Bearer ", "").trim();',
        targetFunction: 'getBearer',
        damage: 40
      }
    ],
    medium: [
      {
        id: 'api-fig-m1',
        title: 'API Counter: Webhook Router',
        bossName: 'PAYLOAD_CORRUPTOR',
        bossTitle: 'Malformed JSON Gremlin',
        difficulty: 'medium',
        language: 'api_json',
        story: 'Inspect webhook event payload: return "ATTACK" for event "boss.strike", "DEFEND" for "boss.shield", and "IDLE" otherwise.',
        task: 'function parseWebhook(payload) -> "ATTACK" | "DEFEND" | "IDLE"',
        starterComment: '// Complete function parseWebhook(payload):\n',
        testCases: [
          { input: [{ event: 'boss.strike' }], expected: 'ATTACK', displayInput: '({ event: "boss.strike" })', displayExpected: '"ATTACK"' },
          { input: [{ event: 'boss.shield' }], expected: 'DEFEND', displayInput: '({ event: "boss.shield" })', displayExpected: '"DEFEND"' }
        ],
        hint: 'if (payload.event === "boss.strike") return "ATTACK"; if (payload.event === "boss.shield") return "DEFEND"; return "IDLE";',
        targetFunction: 'parseWebhook',
        damage: 55
      }
    ],
    hard: [
      {
        id: 'api-fig-h1',
        title: 'API Finisher: Query String Matrix',
        bossName: 'RATE_LIMIT_TITAN',
        bossTitle: 'HTTP 429 DDoS Behemoth',
        difficulty: 'hard',
        language: 'api_json',
        story: 'Compile query params object into a valid query string `key1=val1&key2=val2` (ignore null or undefined values) to overwhelm the rate limiter!',
        task: 'function makeQuery(params) -> URL encoded query string',
        starterComment: '// Complete function makeQuery(params):\n',
        testCases: [
          { input: [{ page: 1, limit: 10 }], expected: 'page=1&limit=10', displayInput: '({ page: 1, limit: 10 })', displayExpected: '"page=1&limit=10"' },
          { input: [{ filter: 'boss', sort: null, limit: 5 }], expected: 'filter=boss&limit=5', displayInput: '({ filter: "boss", sort: null, limit: 5 })', displayExpected: '"filter=boss&limit=5"' }
        ],
        hint: 'Object.entries(params).filter(([_, v]) => v != null).map(([k, v]) => `${k}=${v}`).join("&");',
        targetFunction: 'makeQuery',
        damage: 75
      }
    ]
  }
};

// -------------------------------------------------------------
// UNLIMITED / PROCEDURAL CHALLENGE GENERATORS & SELECTORS
// -------------------------------------------------------------

export function getPuzzleChallenge(
  lang: LanguageType,
  diff: DifficultyLevel,
  round: number = 0
): PuzzleChallenge {
  const list = PUZZLE_CHALLENGES[lang]?.[diff] || PUZZLE_CHALLENGES.javascript.easy;
  if (round < list.length) {
    return list[round];
  }
  // If user plays endlessly past curated list, generate procedural variant
  return generateProceduralPuzzle(lang, diff, round);
}

export function getFighterChallenge(
  lang: LanguageType,
  diff: DifficultyLevel,
  round: number = 0
): FighterChallenge {
  const list = FIGHTER_CHALLENGES[lang]?.[diff] || FIGHTER_CHALLENGES.javascript.easy;
  if (round < list.length) {
    return list[round];
  }
  // Endless procedural boss generation
  return generateProceduralFighter(lang, diff, round);
}

export function generateProceduralPuzzle(
  lang: LanguageType,
  diff: DifficultyLevel,
  round: number
): PuzzleChallenge {
  const gridSize = diff === 'easy' ? 5 : diff === 'medium' ? 6 : 7;
  const targetX = (round * 2 + 3) % (gridSize - 1) + 1;
  const targetY = (round * 3 + 2) % (gridSize - 1) + 1;
  const wallCount = diff === 'easy' ? 2 : diff === 'medium' ? 4 : 6;
  const walls: GridPosition[] = [];

  for (let i = 0; i < wallCount; i++) {
    const wx = (i * 2 + 1) % gridSize;
    const wy = (i + 1) % gridSize;
    if (!(wx === 0 && wy === 0) && !(wx === targetX && wy === targetY)) {
      walls.push({ x: wx, y: wy });
    }
  }

  const hasKey = diff !== 'easy' || round % 2 === 1;
  const keyPos = hasKey ? { x: Math.floor(gridSize / 2), y: Math.max(0, targetY - 1) } : undefined;

  const starterComment = lang === 'python'
    ? '# Write your bot navigation commands below:\n'
    : '// Write your bot navigation commands below:\n';

  return {
    id: `proc-puz-${lang}-${diff}-${round}`,
    title: `Procedural Sector ${round + 1}: Quantum Vector ${targetX}x${targetY}`,
    difficulty: diff,
    language: lang,
    instructions: hasKey
      ? `Endless Mission #${round + 1}: Navigate the drone from (0,0) to collect the key at (${keyPos?.x}, ${keyPos?.y}), then enter the extraction portal at (${targetX}, ${targetY}). Avoid all firewall barriers.`
      : `Endless Mission #${round + 1}: Guide the drone safely from (0,0) to the quantum portal at (${targetX}, ${targetY}) navigating around all security barriers.`,
    syntaxGuide: lang === 'python'
      ? 'Commands: bot.right(steps), bot.left(steps), bot.up(steps), bot.down(steps)' + (hasKey ? ', bot.collect_key()' : '')
      : 'Commands: bot.right(steps), bot.left(steps), bot.up(steps), bot.down(steps)' + (hasKey ? ', bot.collectKey()' : ''),
    starterComment,
    layout: {
      gridSize,
      start: { x: 0, y: 0 },
      goal: { x: targetX, y: targetY },
      walls,
      key: keyPos
    },
    hint: `Plan your route coordinates: start at (0,0), move across the columns and rows toward (${targetX}, ${targetY}).`,
    defaultCommands: ['right', 'down', 'right', 'down']
  };
}

const BOSS_TITLES = [
  'SYNTAX_LEVIATHAN',
  'BYTE_STORM_NINJA',
  'INFINITE_RECURSION_COLOSSUS',
  'CORRUPT_POINTER_BEHEMOTH',
  'NULL_POINTER_SPECTER',
  'DEADLOCK_WARLORD'
];

export function generateProceduralFighter(
  lang: LanguageType,
  diff: DifficultyLevel,
  round: number
): FighterChallenge {
  const bossName = BOSS_TITLES[round % BOSS_TITLES.length] + `_MK${round + 1}`;
  const damage = diff === 'easy' ? 45 : diff === 'medium' ? 60 : 75;

  const baseProblems = [
    {
      task: 'function calculatePower(base, multiplier) -> total power (base * multiplier + 10)',
      targetFunction: 'calculatePower',
      testCases: [
        { input: [10, 2], expected: 30, displayInput: '(10, 2)', displayExpected: '30' },
        { input: [5, 4], expected: 30, displayInput: '(5, 4)', displayExpected: '30' },
        { input: [20, 3], expected: 70, displayInput: '(20, 3)', displayExpected: '70' }
      ],
      hint: 'return base * multiplier + 10;'
    },
    {
      task: 'function filterThreats(threats, minLevel) -> array of threats >= minLevel',
      targetFunction: 'filterThreats',
      testCases: [
        { input: [[10, 50, 3, 90, 25], 30], expected: [50, 90], displayInput: '([10, 50, 3, 90, 25], 30)', displayExpected: '[50, 90]' },
        { input: [[5, 12, 18], 15], expected: [18], displayInput: '([5, 12, 18], 15)', displayExpected: '[18]' }
      ],
      hint: 'return threats.filter(t => t >= minLevel);'
    },
    {
      task: 'function decryptShield(code) -> reversed string with exclamation mark "!" at end',
      targetFunction: 'decryptShield',
      testCases: [
        { input: ['laser'], expected: 'resal!', displayInput: '("laser")', displayExpected: '"resal!"' },
        { input: ['firewall'], expected: 'llawerif!', displayInput: '("firewall")', displayExpected: '"llawerif!"' }
      ],
      hint: 'return code.split("").reverse().join("") + "!";'
    }
  ];

  const problem = baseProblems[round % baseProblems.length];
  const starterComment = lang === 'python'
    ? `# Write function ${problem.targetFunction}:\n`
    : `// Write function ${problem.targetFunction}:\n`;

  return {
    id: `proc-fig-${lang}-${diff}-${round}`,
    title: `Battle #${round + 1}: Clash with ${bossName}`,
    bossName,
    bossTitle: `Level ${round + 1} Cybernetic Challenger`,
    difficulty: diff,
    language: lang,
    story: `The combat arena triggers combat protocol against ${bossName}. Write the algorithm to charge your energy beam and execute a critical strike!`,
    task: problem.task,
    starterComment,
    testCases: problem.testCases,
    hint: problem.hint,
    targetFunction: problem.targetFunction,
    damage
  };
}

