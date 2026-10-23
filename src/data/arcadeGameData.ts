export type LanguageKey = 'javascript' | 'python' | 'react' | 'html_css' | 'api_json';

export interface TestCase {
  description: string;
  input?: any;
  expected: any;
  validatorType: 'exact_return' | 'string_match' | 'regex' | 'json_match' | 'custom_eval';
}

export interface ArcadeLevel {
  id: string;
  levelNumber: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Legend';
  missionBrief: string;
  instructions: string[];
  initialCode: string;
  solutionHint: string;
  testCases: TestCase[];
  xpReward: number;
  gameObjective: {
    targetNodes: number;
    hazardCount: number;
    actionName: string;
  };
}

export interface LanguageTrack {
  id: LanguageKey;
  name: string;
  icon: string;
  badge: string;
  accentColor: string;
  description: string;
  levels: ArcadeLevel[];
}

export const ARCADE_TRACKS: Record<LanguageKey, LanguageTrack> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    icon: '⚡',
    badge: 'CORE LOGIC & DOM',
    accentColor: '#F7DF1E',
    description: 'Master higher-order arrays, algorithmic bottlenecks, and asynchronous event logic in modern ECMAScript.',
    levels: [
      {
        id: 'js-1',
        levelNumber: 1,
        title: 'Sector 01: Vector Power Filter',
        difficulty: 'Beginner',
        missionBrief: 'Incoming data packet contains corrupted sub-zero power coordinates. Filter out all negative numbers and return only positive integer power levels.',
        instructions: [
          'Complete the function filterSafePower(readings)',
          'Filter out numbers that are strictly less than 0',
          'Return an array containing only positive integers (>= 0)'
        ],
        initialCode: `// Complete the function below to power up the thrusters
function filterSafePower(readings) {
  // Your code here:
  
}
`,
        solutionHint: 'Use the native Array.prototype.filter() method: return readings.filter(n => n >= 0);',
        testCases: [
          {
            description: 'Filters negative readings [-5, 12, -2, 80, 0]',
            input: [-5, 12, -2, 80, 0],
            expected: [12, 80, 0],
            validatorType: 'exact_return'
          },
          {
            description: 'Handles all negative values [-1, -99]',
            input: [-1, -99],
            expected: [],
            validatorType: 'exact_return'
          },
          {
            description: 'Keeps all valid positive values [10, 20, 30]',
            input: [10, 20, 30],
            expected: [10, 20, 30],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 150,
        gameObjective: { targetNodes: 3, hazardCount: 1, actionName: 'OVERRIDE NEGATIVE FLUX' }
      },
      {
        id: 'js-2',
        levelNumber: 2,
        title: 'Sector 02: Telemetry Energy Synthesizer',
        difficulty: 'Beginner',
        missionBrief: 'Calculate the total energy sum from an array of drone telemetry modules using Array reduce.',
        instructions: [
          'Complete sumEnergy(modules)',
          'Sum up every energy level in the array',
          'Return 0 if the array is empty'
        ],
        initialCode: `function sumEnergy(modules) {
  // Calculate total energy from all modules
  
}
`,
        solutionHint: 'Use array.reduce((acc, curr) => acc + curr, 0);',
        testCases: [
          {
            description: 'Sums energy [10, 25, 65]',
            input: [10, 25, 65],
            expected: 100,
            validatorType: 'exact_return'
          },
          {
            description: 'Returns 0 for empty array []',
            input: [],
            expected: 0,
            validatorType: 'exact_return'
          },
          {
            description: 'Calculates high voltage [500, 250, 750]',
            input: [500, 250, 750],
            expected: 1500,
            validatorType: 'exact_return'
          }
        ],
        xpReward: 200,
        gameObjective: { targetNodes: 4, hazardCount: 2, actionName: 'CALCULATE ENERGY CORE' }
      },
      {
        id: 'js-3',
        levelNumber: 3,
        title: 'Sector 03: Firewall String Inversion',
        difficulty: 'Intermediate',
        missionBrief: 'The defense mainframe firewall requires incoming authorization keys to be reversed before transmission.',
        instructions: [
          'Complete reverseSecurityKey(key)',
          'Take a string input and return it in reverse order',
          'Example: "CYBER" -> "REBYC"'
        ],
        initialCode: `function reverseSecurityKey(key) {
  // Reverse the string payload to bypass firewall
  
}
`,
        solutionHint: 'Split into an array of characters, reverse it, and join: key.split("").reverse().join("");',
        testCases: [
          {
            description: 'Reverses "CYBER"',
            input: 'CYBER',
            expected: 'REBYC',
            validatorType: 'exact_return'
          },
          {
            description: 'Reverses security hash "ARCADE99"',
            input: 'ARCADE99',
            expected: '99EDACRA',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 250,
        gameObjective: { targetNodes: 5, hazardCount: 2, actionName: 'INVERT FIREWALL HASH' }
      },
      {
        id: 'js-4',
        levelNumber: 4,
        title: 'Sector 04: Duplicate Signal Decontamination',
        difficulty: 'Advanced',
        missionBrief: 'Enemy frequency jammers are duplicating sensor telemetry. Return an array of unique signal frequencies preserving first encounter order.',
        instructions: [
          'Complete deduplicateSignals(frequencies)',
          'Remove all duplicate numbers from the array',
          'Return unique values only'
        ],
        initialCode: `function deduplicateSignals(frequencies) {
  // Eliminate duplicate sensor noise
  
}
`,
        solutionHint: 'Use the modern ES6 Set: return [...new Set(frequencies)];',
        testCases: [
          {
            description: 'Deduplicates [102.5, 98.1, 102.5, 88.0, 98.1]',
            input: [102.5, 98.1, 102.5, 88.0, 98.1],
            expected: [102.5, 98.1, 88.0],
            validatorType: 'exact_return'
          },
          {
            description: 'Leaves unique arrays intact [1, 2, 3]',
            input: [1, 2, 3],
            expected: [1, 2, 3],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 300,
        gameObjective: { targetNodes: 6, hazardCount: 3, actionName: 'PURGE FREQUENCY GHOSTS' }
      },
      {
        id: 'js-5',
        levelNumber: 5,
        title: 'Sector 05: Asynchronous Drone Ping Array',
        difficulty: 'Legend',
        missionBrief: 'Process an array of drone IDs and return an object grouping active vs standby status based on whether ID is even or odd.',
        instructions: [
          'Complete sortDroneSwarm(droneIds)',
          'Return an object with structure: { active: number[], standby: number[] }',
          'Even IDs belong in active; Odd IDs belong in standby'
        ],
        initialCode: `function sortDroneSwarm(droneIds) {
  // Sort into { active: [...even], standby: [...odd] }
  
}
`,
        solutionHint: 'Iterate or reduce: const active = droneIds.filter(id => id % 2 === 0); const standby = droneIds.filter(id => id % 2 !== 0); return { active, standby };',
        testCases: [
          {
            description: 'Sorts [10, 15, 22, 33, 44]',
            input: [10, 15, 22, 33, 44],
            expected: { active: [10, 22, 44], standby: [15, 33] },
            validatorType: 'exact_return'
          },
          {
            description: 'Handles all even [2, 4, 6]',
            input: [2, 4, 6],
            expected: { active: [2, 4, 6], standby: [] },
            validatorType: 'exact_return'
          }
        ],
        xpReward: 400,
        gameObjective: { targetNodes: 7, hazardCount: 4, actionName: 'ORCHESTRATE SWARM MATRIX' }
      }
    ]
  },
  python: {
    id: 'python',
    name: 'Python 3',
    icon: '🐍',
    badge: 'ALGORITHMS & DATA',
    accentColor: '#3776AB',
    description: 'Clean algorithmic implementations, list comprehensions, dictionary mappings, and data filtering in Python.',
    levels: [
      {
        id: 'py-1',
        levelNumber: 1,
        title: 'Subroutine 01: Vector Maximum Tracker',
        difficulty: 'Beginner',
        missionBrief: 'Find the highest telemetry altitude reached by the cyber-bot scout from a list of integer altitudes.',
        instructions: [
          'Complete find_max_altitude(altitudes)',
          'Return the maximum value in the list',
          'If list is empty, return 0'
        ],
        initialCode: `def find_max_altitude(altitudes):
    # Return the maximum altitude integer
    if not altitudes:
        return 0
    return max(altitudes)
`,
        solutionHint: 'Check if altitudes is empty, then return max(altitudes).',
        testCases: [
          {
            description: 'Finds peak in [120, 850, 430, 920, 310]',
            input: [120, 850, 430, 920, 310],
            expected: 920,
            validatorType: 'exact_return'
          },
          {
            description: 'Handles empty list []',
            input: [],
            expected: 0,
            validatorType: 'exact_return'
          }
        ],
        xpReward: 150,
        gameObjective: { targetNodes: 3, hazardCount: 1, actionName: 'LOCATE RADAR APEX' }
      },
      {
        id: 'py-2',
        levelNumber: 2,
        title: 'Subroutine 02: List Comprehension Purifier',
        difficulty: 'Beginner',
        missionBrief: 'Using Pythonic list comprehension, square every even coordinate in the list and return the new list.',
        instructions: [
          'Complete square_evens(numbers)',
          'Square only the numbers where n % 2 == 0',
          'Example: [1, 2, 3, 4] -> [4, 16]'
        ],
        initialCode: `def square_evens(numbers):
    # Return squared values of even numbers only
    return [n ** 2 for n in numbers if n % 2 == 0]
`,
        solutionHint: 'Return [n ** 2 for n in numbers if n % 2 == 0]',
        testCases: [
          {
            description: 'Squares evens in [1, 2, 3, 4, 5, 6]',
            input: [1, 2, 3, 4, 5, 6],
            expected: [4, 16, 36],
            validatorType: 'exact_return'
          },
          {
            description: 'Handles list with no evens [1, 3, 5]',
            input: [1, 3, 5],
            expected: [],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 200,
        gameObjective: { targetNodes: 4, hazardCount: 2, actionName: 'CALIBRATE EVEN GRID' }
      },
      {
        id: 'py-3',
        levelNumber: 3,
        title: 'Subroutine 03: Telemetry Payload Dictionary',
        difficulty: 'Intermediate',
        missionBrief: 'Count frequency of each cyber anomaly code in a list and return a dictionary mapping anomaly -> count.',
        instructions: [
          'Complete count_anomalies(codes)',
          'Return dict with frequencies { "ERR_404": 2, ... }'
        ],
        initialCode: `def count_anomalies(codes):
    freq = {}
    for code in codes:
        freq[code] = freq.get(code, 0) + 1
    return freq
`,
        solutionHint: 'Use dict.get(code, 0) + 1 in a standard loop or collections.Counter.',
        testCases: [
          {
            description: 'Counts occurrences ["A", "B", "A", "C", "B", "A"]',
            input: ['A', 'B', 'A', 'C', 'B', 'A'],
            expected: { 'A': 3, 'B': 2, 'C': 1 },
            validatorType: 'exact_return'
          }
        ],
        xpReward: 250,
        gameObjective: { targetNodes: 5, hazardCount: 2, actionName: 'MAP SENSOR FREQUENCIES' }
      },
      {
        id: 'py-4',
        levelNumber: 4,
        title: 'Subroutine 04: Palindrome Decryption Core',
        difficulty: 'Advanced',
        missionBrief: 'Verify if a transmission code is identical forward and backward, ignoring case and spaces.',
        instructions: [
          'Complete is_palindrome_code(transmission)',
          'Strip spaces and convert to lowercase',
          'Return True if palindrome, False otherwise'
        ],
        initialCode: `def is_palindrome_code(transmission):
    clean = "".join(transmission.lower().split())
    return clean == clean[::-1]
`,
        solutionHint: 'Clean = "".join(c.lower() for c in transmission if c.isalnum()); return clean == clean[::-1]',
        testCases: [
          {
            description: 'Validates "Radar"',
            input: 'Radar',
            expected: true,
            validatorType: 'exact_return'
          },
          {
            description: 'Validates "nurses run"',
            input: 'nurses run',
            expected: true,
            validatorType: 'exact_return'
          },
          {
            description: 'Rejects "cyberpunk"',
            input: 'cyberpunk',
            expected: false,
            validatorType: 'exact_return'
          }
        ],
        xpReward: 300,
        gameObjective: { targetNodes: 6, hazardCount: 3, actionName: 'AUTHENTICATE MIRROR KEY' }
      },
      {
        id: 'py-5',
        levelNumber: 5,
        title: 'Subroutine 05: Prime Firewall Generator',
        difficulty: 'Legend',
        missionBrief: 'Generate all prime number firewall frequencies up to limit N to seal the quantum leak.',
        instructions: [
          'Complete generate_prime_keys(n)',
          'Return a list of all primes <= n'
        ],
        initialCode: `def generate_prime_keys(n):
    primes = []
    for num in range(2, n + 1):
        is_prime = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes
`,
        solutionHint: 'Iterate from 2 to n and test divisibility up to sqrt(num).',
        testCases: [
          {
            description: 'Finds primes up to 15',
            input: 15,
            expected: [2, 3, 5, 7, 11, 13],
            validatorType: 'exact_return'
          },
          {
            description: 'Finds primes up to 10',
            input: 10,
            expected: [2, 3, 5, 7],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 400,
        gameObjective: { targetNodes: 7, hazardCount: 4, actionName: 'IGNITE QUANTUM PRIME SHIELD' }
      }
    ]
  },
  react: {
    id: 'react',
    name: 'React & JSX',
    icon: '⚛️',
    badge: 'STATE & COMPONENT FLOW',
    accentColor: '#61DAFB',
    description: 'Component lifecycles, useState hooks, controlled inputs, and declarative cyber UI components.',
    levels: [
      {
        id: 'react-1',
        levelNumber: 1,
        title: 'Component 01: CyberShield Badge Renderer',
        difficulty: 'Beginner',
        missionBrief: 'Render a CyberShield badge component that outputs a div with the level and status passed as props.',
        instructions: [
          'Complete function CyberShield({ level, active })',
          'Return a string or simulated JSX representation',
          'Format: `<div class="shield-${active ? "online" : "offline"}">Level ${level}</div>`'
        ],
        initialCode: `// Return formatted component markup string
function CyberShield({ level, active }) {
  const status = active ? 'online' : 'offline';
  return \`<div class="shield-\${status}">Level \${level}</div>\`;
}
`,
        solutionHint: 'Check active boolean and interpolate level: `<div class="shield-${active ? "online" : "offline"}">Level ${level}</div>`',
        testCases: [
          {
            description: 'Renders active Level 5 shield',
            input: { level: 5, active: true },
            expected: '<div class="shield-online">Level 5</div>',
            validatorType: 'exact_return'
          },
          {
            description: 'Renders offline Level 1 shield',
            input: { level: 1, active: false },
            expected: '<div class="shield-offline">Level 1</div>',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 150,
        gameObjective: { targetNodes: 3, hazardCount: 1, actionName: 'MOUNT CYBER SHIELD' }
      },
      {
        id: 'react-2',
        levelNumber: 2,
        title: 'Component 02: Counter Hook Reducer',
        difficulty: 'Beginner',
        missionBrief: 'Simulate a React counter state transition function that prevents battery level from dropping below 0 or exceeding 100.',
        instructions: [
          'Complete adjustBattery(currentLevel, delta)',
          'Clamp the returned integer between 0 and 100',
          'Example: adjustBattery(95, 10) -> 100, adjustBattery(5, -10) -> 0'
        ],
        initialCode: `function adjustBattery(currentLevel, delta) {
  // Clamp battery state between 0 and 100
  const next = currentLevel + delta;
  return Math.min(100, Math.max(0, next));
}
`,
        solutionHint: 'Use Math.max(0, Math.min(100, currentLevel + delta));',
        testCases: [
          {
            description: 'Increments safely from 40 by 20 -> 60',
            input: { currentLevel: 40, delta: 20 },
            expected: 60,
            validatorType: 'custom_eval'
          },
          {
            description: 'Clamps upper bound 95 + 10 -> 100',
            input: { currentLevel: 95, delta: 10 },
            expected: 100,
            validatorType: 'custom_eval'
          },
          {
            description: 'Clamps lower bound 10 - 25 -> 0',
            input: { currentLevel: 10, delta: -25 },
            expected: 0,
            validatorType: 'custom_eval'
          }
        ],
        xpReward: 200,
        gameObjective: { targetNodes: 4, hazardCount: 2, actionName: 'CLAMP BATTERY FLUX' }
      },
      {
        id: 'react-3',
        levelNumber: 3,
        title: 'Component 03: Telemetry List Key Generator',
        difficulty: 'Intermediate',
        missionBrief: 'Create a list item compiler that formats an array of log entries into sanitized JSX list elements with unique deterministic keys.',
        instructions: [
          'Complete formatLogItems(logs)',
          'Map each item to: `<li key="log-${item.id}">${item.message}</li>`',
          'Return array of formatted strings'
        ],
        initialCode: `function formatLogItems(logs) {
  return logs.map(item => \`<li key="log-\${item.id}">\${item.message}</li>\`);
}
`,
        solutionHint: 'logs.map(l => `<li key="log-${l.id}">${l.message}</li>`)',
        testCases: [
          {
            description: 'Formats log array',
            input: [{ id: 1, message: 'Node Alpha Active' }, { id: 2, message: 'Firewall Intact' }],
            expected: ['<li key="log-1">Node Alpha Active</li>', '<li key="log-2">Firewall Intact</li>'],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 250,
        gameObjective: { targetNodes: 5, hazardCount: 2, actionName: 'MAP VIRTUAL DOM NODES' }
      },
      {
        id: 'react-4',
        levelNumber: 4,
        title: 'Component 04: Controlled Input Sanitizer',
        difficulty: 'Advanced',
        missionBrief: 'Sanitize user terminal command strings: trim leading/trailing whitespace, replace spaces with hyphens, and convert to uppercase.',
        instructions: [
          'Complete sanitizeCommand(input)',
          'Trim string, replace all spaces with "-", convert to UPPERCASE',
          'Example: "  scan sector seven  " -> "SCAN-SECTOR-SEVEN"'
        ],
        initialCode: `function sanitizeCommand(input) {
  return input.trim().replace(/\\s+/g, '-').toUpperCase();
}
`,
        solutionHint: 'input.trim().replace(/\\s+/g, "-").toUpperCase()',
        testCases: [
          {
            description: 'Sanitizes "  reboot core node  "',
            input: '  reboot core node  ',
            expected: 'REBOOT-CORE-NODE',
            validatorType: 'exact_return'
          },
          {
            description: 'Handles single command "fire"',
            input: 'fire',
            expected: 'FIRE',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 300,
        gameObjective: { targetNodes: 6, hazardCount: 3, actionName: 'CLEANSE TERMINAL INPUT' }
      },
      {
        id: 'react-5',
        levelNumber: 5,
        title: 'Component 05: Multi-Agent State Dispatcher',
        difficulty: 'Legend',
        missionBrief: 'Simulate a state reducer handling action types: "ADD_XP", "LEVEL_UP", and "RESET". Return the next immutable state object.',
        instructions: [
          'Complete arcadeReducer(state, action)',
          'Action ADD_XP: state.xp + action.payload',
          'Action LEVEL_UP: state.level + 1',
          'Action RESET: { level: 1, xp: 0 }'
        ],
        initialCode: `function arcadeReducer(state, action) {
  switch (action.type) {
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload };
    case 'LEVEL_UP':
      return { ...state, level: state.level + 1 };
    case 'RESET':
      return { level: 1, xp: 0 };
    default:
      return state;
  }
}
`,
        solutionHint: 'Use a switch statement over action.type and return new state clones with object spread.',
        testCases: [
          {
            description: 'Adds 250 XP',
            input: { state: { level: 2, xp: 100 }, action: { type: 'ADD_XP', payload: 250 } },
            expected: { level: 2, xp: 350 },
            validatorType: 'custom_eval'
          },
          {
            description: 'Increments Level',
            input: { state: { level: 2, xp: 350 }, action: { type: 'LEVEL_UP' } },
            expected: { level: 3, xp: 350 },
            validatorType: 'custom_eval'
          }
        ],
        xpReward: 400,
        gameObjective: { targetNodes: 7, hazardCount: 4, actionName: 'DISPATCH REDUX TELEMETRY' }
      }
    ]
  },
  html_css: {
    id: 'html_css',
    name: 'HTML5 & Modern CSS3',
    icon: '🎨',
    badge: 'GRID, FLEX & ACCESSIBILITY',
    accentColor: '#E34F26',
    description: 'Flexbox alignment, CSS Grid matrices, neon glow box-shadows, and semantic markup precision.',
    levels: [
      {
        id: 'css-1',
        levelNumber: 1,
        title: 'Layout 01: Perfect Flexbox Centering',
        difficulty: 'Beginner',
        missionBrief: 'Generate the required CSS declaration string to perfectly center an item horizontally and vertically inside a container using Flexbox.',
        instructions: [
          'Complete generateCenterFlex()',
          'Return an object or CSS string containing display, justify-content, and align-items properties'
        ],
        initialCode: `function generateCenterFlex() {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
}
`,
        solutionHint: 'Return { display: "flex", justifyContent: "center", alignItems: "center" }',
        testCases: [
          {
            description: 'Validates flex centering properties',
            input: null,
            expected: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            validatorType: 'exact_return'
          }
        ],
        xpReward: 150,
        gameObjective: { targetNodes: 3, hazardCount: 1, actionName: 'CENTER CORE GRAVITY' }
      },
      {
        id: 'css-2',
        levelNumber: 2,
        title: 'Layout 02: Cyberpunk Neon Box Shadow',
        difficulty: 'Beginner',
        missionBrief: 'Synthesize a multi-layered neon glow CSS box-shadow string using neon lime green (#B7FF3C).',
        instructions: [
          'Complete generateNeonGlow(colorHex, spreadPx)',
          'Return format: `0 0 ${spreadPx}px ${colorHex}, 0 0 ${spreadPx * 2}px ${colorHex}`'
        ],
        initialCode: `function generateNeonGlow(colorHex, spreadPx) {
  return \`0 0 \${spreadPx}px \${colorHex}, 0 0 \${spreadPx * 2}px \${colorHex}\`;
}
`,
        solutionHint: 'Interpolate spread and double spread: `0 0 ${spreadPx}px ${colorHex}, 0 0 ${spreadPx * 2}px ${colorHex}`',
        testCases: [
          {
            description: 'Generates glow for #B7FF3C and 10px',
            input: { colorHex: '#B7FF3C', spreadPx: 10 },
            expected: '0 0 10px #B7FF3C, 0 0 20px #B7FF3C',
            validatorType: 'custom_eval'
          }
        ],
        xpReward: 200,
        gameObjective: { targetNodes: 4, hazardCount: 2, actionName: 'IGNITE NEON RADIANCE' }
      },
      {
        id: 'css-3',
        levelNumber: 3,
        title: 'Layout 03: Responsive 3-Column Grid Template',
        difficulty: 'Intermediate',
        missionBrief: 'Return the CSS grid-template-columns string for a 3-column equal distribution layout.',
        instructions: [
          'Complete getGridThreeColumns()',
          'Return "repeat(3, minmax(0, 1fr))" or "1fr 1fr 1fr"'
        ],
        initialCode: `function getGridThreeColumns() {
  return 'repeat(3, minmax(0, 1fr))';
}
`,
        solutionHint: 'Return "repeat(3, minmax(0, 1fr))";',
        testCases: [
          {
            description: 'Returns valid 3-column definition',
            input: null,
            expected: 'repeat(3, minmax(0, 1fr))',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 250,
        gameObjective: { targetNodes: 5, hazardCount: 2, actionName: 'COMPOSE SPATIAL MATRIX' }
      },
      {
        id: 'css-4',
        levelNumber: 4,
        title: 'Layout 04: Accessible Image Semantic Validator',
        difficulty: 'Advanced',
        missionBrief: 'Verify an HTML image tag string has both a non-empty alt attribute and a loading="lazy" attribute for Core Web Vitals optimization.',
        instructions: [
          'Complete validateImgTag(tagString)',
          'Return true if contains alt="..." and loading="lazy", false otherwise'
        ],
        initialCode: `function validateImgTag(tagString) {
  const hasAlt = /alt="[^"]+"/.test(tagString);
  const hasLazy = /loading="lazy"/.test(tagString);
  return hasAlt && hasLazy;
}
`,
        solutionHint: 'Test with regex: /alt="[^"]+"/.test(tagString) && /loading="lazy"/.test(tagString)',
        testCases: [
          {
            description: 'Accepts optimized tag',
            input: '<img src="/drone.png" alt="Drone Scout" loading="lazy" />',
            expected: true,
            validatorType: 'exact_return'
          },
          {
            description: 'Rejects tag missing lazy loading',
            input: '<img src="/drone.png" alt="Drone Scout" />',
            expected: false,
            validatorType: 'exact_return'
          }
        ],
        xpReward: 300,
        gameObjective: { targetNodes: 6, hazardCount: 3, actionName: 'AUDIT ACCESSIBILITY TAGS' }
      },
      {
        id: 'css-5',
        levelNumber: 5,
        title: 'Layout 05: CSS Clamp Fluid Typography Formula',
        difficulty: 'Legend',
        missionBrief: 'Generate a CSS clamp() expression that scales fluidly between minimum 1rem and maximum 2.5rem across viewport widths.',
        instructions: [
          'Complete generateFluidFont(minRem, preferredVw, maxRem)',
          'Return `clamp(${minRem}rem, ${preferredVw}vw, ${maxRem}rem)`'
        ],
        initialCode: `function generateFluidFont(minRem, preferredVw, maxRem) {
  return \`clamp(\${minRem}rem, \${preferredVw}vw, \${maxRem}rem)\`;
}
`,
        solutionHint: 'return `clamp(${minRem}rem, ${preferredVw}vw, ${maxRem}rem)`;',
        testCases: [
          {
            description: 'Generates fluid headline clamp',
            input: { minRem: 1.25, preferredVw: 4.5, maxRem: 3 },
            expected: 'clamp(1.25rem, 4.5vw, 3rem)',
            validatorType: 'custom_eval'
          }
        ],
        xpReward: 400,
        gameObjective: { targetNodes: 7, hazardCount: 4, actionName: 'LOCK FLUID TYPOGRAPHY' }
      }
    ]
  },
  api_json: {
    id: 'api_json',
    name: 'JSON, Webhooks & APIs',
    icon: '🛰️',
    badge: 'PAYLOAD ROUTING & AUTOMATION',
    accentColor: '#10B981',
    description: 'REST responses, webhook signature authentication, payload filtering, and data extraction pipelines.',
    levels: [
      {
        id: 'api-1',
        levelNumber: 1,
        title: 'Payload 01: Extract Authorization Token',
        difficulty: 'Beginner',
        missionBrief: 'Extract the raw bearer token string from an incoming HTTP Authorization header string.',
        instructions: [
          'Complete extractBearerToken(authHeader)',
          'Example: "Bearer eyJhbGciOi..." -> "eyJhbGciOi..."',
          'Return empty string if invalid or missing "Bearer "'
        ],
        initialCode: `function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return '';
  return authHeader.replace('Bearer ', '').trim();
}
`,
        solutionHint: 'Check startsWith("Bearer ") and slice or replace: authHeader.replace("Bearer ", "").trim();',
        testCases: [
          {
            description: 'Extracts valid token',
            input: 'Bearer secret_token_xyz99',
            expected: 'secret_token_xyz99',
            validatorType: 'exact_return'
          },
          {
            description: 'Rejects missing bearer header',
            input: 'Basic dXNlcjpwYXNz',
            expected: '',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 150,
        gameObjective: { targetNodes: 3, hazardCount: 1, actionName: 'EXTRACT BEARER CERT' }
      },
      {
        id: 'api-2',
        levelNumber: 2,
        title: 'Payload 02: Webhook Event Router',
        difficulty: 'Beginner',
        missionBrief: 'Inspect incoming webhook payload event type and return "PROCESS_PAYMENT" for order events or "SYNC_CRM" for lead events.',
        instructions: [
          'Complete routeWebhookEvent(payload)',
          'If payload.event === "order.completed", return "PROCESS_PAYMENT"',
          'If payload.event === "lead.created", return "SYNC_CRM"',
          'Otherwise return "IGNORE"'
        ],
        initialCode: `function routeWebhookEvent(payload) {
  if (payload.event === 'order.completed') return 'PROCESS_PAYMENT';
  if (payload.event === 'lead.created') return 'SYNC_CRM';
  return 'IGNORE';
}
`,
        solutionHint: 'Use conditional checks against payload.event string.',
        testCases: [
          {
            description: 'Routes order event',
            input: { event: 'order.completed', id: 'ord_123' },
            expected: 'PROCESS_PAYMENT',
            validatorType: 'exact_return'
          },
          {
            description: 'Routes lead event',
            input: { event: 'lead.created', name: 'Alex' },
            expected: 'SYNC_CRM',
            validatorType: 'exact_return'
          },
          {
            description: 'Ignores unknown event',
            input: { event: 'ping' },
            expected: 'IGNORE',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 200,
        gameObjective: { targetNodes: 4, hazardCount: 2, actionName: 'ROUTE EVENT VECTOR' }
      },
      {
        id: 'api-3',
        levelNumber: 3,
        title: 'Payload 03: Safe Nested JSON Key Extractor',
        difficulty: 'Intermediate',
        missionBrief: 'Safely extract customer city from nested JSON payload `payload.customer.address.city` without crashing if any key is null.',
        instructions: [
          'Complete getCustomerCity(payload)',
          'Use optional chaining or safe check',
          'Return city string or "UNKNOWN" if not present'
        ],
        initialCode: `function getCustomerCity(payload) {
  return payload?.customer?.address?.city || 'UNKNOWN';
}
`,
        solutionHint: 'Use optional chaining: return payload?.customer?.address?.city || "UNKNOWN";',
        testCases: [
          {
            description: 'Extracts existing city',
            input: { customer: { address: { city: 'San Francisco' } } },
            expected: 'San Francisco',
            validatorType: 'exact_return'
          },
          {
            description: 'Handles missing address safely',
            input: { customer: null },
            expected: 'UNKNOWN',
            validatorType: 'exact_return'
          }
        ],
        xpReward: 250,
        gameObjective: { targetNodes: 5, hazardCount: 2, actionName: 'TRAVERSE JSON TREE' }
      },
      {
        id: 'api-4',
        levelNumber: 4,
        title: 'Payload 04: Filter High-Value Invoices',
        difficulty: 'Advanced',
        missionBrief: 'Filter an array of invoice objects, returning only paid invoices where amount exceeds $1,000.',
        instructions: [
          'Complete filterEnterpriseInvoices(invoices)',
          'Keep only items where invoice.status === "paid" AND invoice.amount > 1000'
        ],
        initialCode: `function filterEnterpriseInvoices(invoices) {
  return invoices.filter(inv => inv.status === 'paid' && inv.amount > 1000);
}
`,
        solutionHint: 'invoices.filter(i => i.status === "paid" && i.amount > 1000);',
        testCases: [
          {
            description: 'Filters invoices correctly',
            input: [
              { id: 1, amount: 500, status: 'paid' },
              { id: 2, amount: 2500, status: 'paid' },
              { id: 3, amount: 5000, status: 'pending' },
              { id: 4, amount: 1200, status: 'paid' }
            ],
            expected: [
              { id: 2, amount: 2500, status: 'paid' },
              { id: 4, amount: 1200, status: 'paid' }
            ],
            validatorType: 'exact_return'
          }
        ],
        xpReward: 300,
        gameObjective: { targetNodes: 6, hazardCount: 3, actionName: 'FILTER ENTERPRISE LEDGER' }
      },
      {
        id: 'api-5',
        levelNumber: 5,
        title: 'Payload 05: Pagination URL Query Compiler',
        difficulty: 'Legend',
        missionBrief: 'Compile a base API endpoint with query parameters (page, limit, search) into a standardized URL query string.',
        instructions: [
          'Complete buildApiUrl(baseUrl, params)',
          'Example: ("https://api.cyber.io/nodes", { page: 2, limit: 50 }) -> "https://api.cyber.io/nodes?page=2&limit=50"',
          'Ignore null or undefined values'
        ],
        initialCode: `function buildApiUrl(baseUrl, params) {
  const query = Object.entries(params)
    .filter(([_, v]) => v !== null && v !== undefined)
    .map(([k, v]) => \`\${encodeURIComponent(k)}=\${encodeURIComponent(v)}\`)
    .join('&');
  return query ? \`\${baseUrl}?\${query}\` : baseUrl;
}
`,
        solutionHint: 'Use URLSearchParams or Object.entries with filter and encodeURIComponent.',
        testCases: [
          {
            description: 'Builds clean query string',
            input: { baseUrl: 'https://api.bot.io/v1', params: { page: 1, limit: 25 } },
            expected: 'https://api.bot.io/v1?page=1&limit=25',
            validatorType: 'custom_eval'
          }
        ],
        xpReward: 400,
        gameObjective: { targetNodes: 7, hazardCount: 4, actionName: 'DISPATCH REST QUERY' }
      }
    ]
  }
};
