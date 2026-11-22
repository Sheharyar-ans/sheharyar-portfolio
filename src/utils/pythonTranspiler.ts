/**
 * Real client-side Python-to-JavaScript transpiler for the 3D Code Arcade
 * and Interactive Game Arena. Supports indentation-based blocks, list
 * comprehensions, common Python built-ins, string/dict helpers, and slicing.
 */

const PYTHON_RUNTIME = `
const len = (x) => (x == null ? 0 : typeof x.length === 'number' ? x.length : Object.keys(x).length);
const int = (x) => parseInt(x, 10);
const float = (x) => parseFloat(x);
const str = (x) => String(x);
const abs = Math.abs;
const round = (x, n = 0) => Number(x.toFixed(n));
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const max = (...args) => (args.length === 1 && Array.isArray(args[0]) ? Math.max(...args[0]) : Math.max(...args));
const min = (...args) => (args.length === 1 && Array.isArray(args[0]) ? Math.min(...args[0]) : Math.min(...args));
const sorted = (arr) => [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
const list = (x) => Array.from(x);
const enumerate = (arr) => arr.map((v, i) => [i, v]);
const range = (start, stop, step = 1) => {
  if (stop === undefined) { stop = start; start = 0; }
  const out = [];
  if (step > 0) { for (let i = start; i < stop; i += step) out.push(i); }
  else if (step < 0) { for (let i = start; i > stop; i += step) out.push(i); }
  return out;
};
const print = (...args) => { if (typeof console !== 'undefined' && console.log) console.log(...args); };
const __pyRev = (x) => (typeof x === 'string' ? x.split('').reverse().join('') : [...x].reverse());
const __pyJoin = (sep, arr) => arr.join(sep);
const __pySplit = (s, sep) => (sep === undefined ? String(s).trim().split(/\\s+/).filter(Boolean) : String(s).split(sep));
const __pyGet = (obj, key, def = null) => (obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : def);
`;

function convertPythonExpr(expr: string): string {
  let out = expr;

  // List comprehensions: [expr for var in iter if cond] or [expr for var in iter]
  out = out.replace(
    /\[([^\[\]]+?)\s+for\s+(\w+)\s+in\s+([^\[\]]+?)\s+if\s+([^\[\]]+?)\]/g,
    (_, body, v, iter, cond) =>
      `list(${convertPythonExpr(iter)}).filter((${v}) => ${convertPythonExpr(cond)}).map((${v}) => ${convertPythonExpr(body)})`
  );
  out = out.replace(
    /\[([^\[\]]+?)\s+for\s+(\w+)\s+in\s+([^\[\]]+?)\]/g,
    (_, body, v, iter) =>
      `list(${convertPythonExpr(iter)}).map((${v}) => ${convertPythonExpr(body)})`
  );

  // String/list reverse slice: ident[::-1]
  out = out.replace(/(\w+)\[::-1\]/g, '__pyRev($1)');

  // "".join(...) / 'sep'.join(...)
  out = out.replace(/(["'])(.*?)\1\.join\(([^)]+)\)/g, (_, _q, sep, arg) => `__pyJoin(${JSON.stringify(sep)}, ${arg})`);

  // .lower() / .upper() / .strip() / .append() / .get(k, d)
  out = out.replace(/\.lower\(\)/g, '.toLowerCase()');
  out = out.replace(/\.upper\(\)/g, '.toUpperCase()');
  out = out.replace(/\.strip\(\)/g, '.trim()');
  out = out.replace(/\.append\(/g, '.push(');
  out = out.replace(/\.split\(\)/g, '.trim().split(/\\s+/).filter(Boolean)');
  out = out.replace(/(\w+)\.get\(([^,)]+),\s*([^)]+)\)/g, '__pyGet($1, $2, $3)');
  out = out.replace(/(\w+)\.get\(([^)]+)\)/g, '__pyGet($1, $2, null)');

  // Floor division a // b -> Math.floor(a / b)
  out = out.replace(/(\S+)\s*\/\/\s*(\S+)/g, 'Math.floor(($1) / ($2))');

  // Boolean / null / logical operators
  out = out
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\s+/g, '!')
    .replace(/==/g, '===')
    .replace(/!=/g, '!==');

  return out;
}

/**
 * Converts indented Python lines into JS code with proper `{ ... }` block scoping.
 */
export function transpilePythonBlock(code: string): string {
  const rawLines = code.replace(/\r\n/g, '\n').split('\n');
  const indentStack: number[] = [0];
  const out: string[] = [];
  const declaredVars = new Set<string>();

  for (const rawLine of rawLines) {
    const commentStripped = rawLine.replace(/#.*$/, '');
    if (!commentStripped.trim()) continue;

    const indent = rawLine.search(/\S/);
    const trimmed = commentStripped.trim();

    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      out.push('}');
    }

    if (trimmed === 'pass') {
      continue;
    }

    // Block headers ending with ':'
    if (/^elif\s+(.+):$/.test(trimmed)) {
      const cond = trimmed.replace(/^elif\s+(.+):$/, '$1');
      out.push(`else if (${convertPythonExpr(cond)}) {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (trimmed === 'else:') {
      out.push('else {');
      indentStack.push(indent + 4);
      continue;
    }
    if (/^if\s+(.+):$/.test(trimmed)) {
      const cond = trimmed.replace(/^if\s+(.+):$/, '$1');
      out.push(`if (${convertPythonExpr(cond)}) {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (/^while\s+(.+):$/.test(trimmed)) {
      const cond = trimmed.replace(/^while\s+(.+):$/, '$1');
      out.push(`while (${convertPythonExpr(cond)}) {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (/^for\s+(\w+)\s+in\s+(.+):$/.test(trimmed)) {
      const m = trimmed.match(/^for\s+(\w+)\s+in\s+(.+):$/);
      if (m) {
        const [, varName, iterExpr] = m;
        declaredVars.add(varName);
        out.push(`for (const ${varName} of ${convertPythonExpr(iterExpr)}) {`);
        indentStack.push(indent + 4);
        continue;
      }
    }

    // Simple variable assignment: x = expr (not ==, !=, <=, >=, +=, -=)
    const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*([^=].*)$/);
    if (assignMatch) {
      const [, varName, rhs] = assignMatch;
      const convertedRhs = convertPythonExpr(rhs);
      if (!declaredVars.has(varName)) {
        declaredVars.add(varName);
        out.push(`let ${varName} = ${convertedRhs};`);
      } else {
        out.push(`${varName} = ${convertedRhs};`);
      }
      continue;
    }

    out.push(`${convertPythonExpr(trimmed)};`);
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    out.push('}');
  }

  return out.join('\n');
}

/**
 * Parses a Python `def fn_name(params):` block and returns a real executable JS function.
 */
export function transpilePythonFunction(
  code: string,
  expectedFnName?: string,
  customConsole?: { log: (...args: any[]) => void }
): (...args: any[]) => any {
  const lines = code.replace(/\r\n/g, '\n').split('\n');
  const defIdx = lines.findIndex((l) => /^\s*def\s+\w+\s*\(.*\)\s*:/.test(l));
  if (defIdx === -1) {
    throw new Error(
      expectedFnName
        ? `Python Syntax Error: Expected 'def ${expectedFnName}(...):'`
        : 'Python Syntax Error: Expected a function definition (def ...):'
    );
  }

  const defMatch = lines[defIdx].match(/^\s*def\s+(\w+)\s*\((.*?)\)\s*:/);
  if (!defMatch) {
    throw new Error('Python Syntax Error: Invalid def signature.');
  }

  const [, fnName, rawParams] = defMatch;
  if (expectedFnName && fnName !== expectedFnName) {
    throw new Error(`Expected function '${expectedFnName}', but found '${fnName}'.`);
  }

  const bodyLines = lines.slice(defIdx + 1);
  const nonEmptyBody = bodyLines.filter((l) => l.trim() && !l.trim().startsWith('#') && l.trim() !== 'pass');
  if (nonEmptyBody.length === 0) {
    throw new Error(`Function '${fnName}' has no implementation yet.`);
  }

  const jsBody = transpilePythonBlock(bodyLines.join('\n'));
  const params = rawParams
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .join(', ');

  const factory = new Function(
    'console',
    `
    "use strict";
    ${PYTHON_RUNTIME}
    return function ${fnName}(${params}) {
      ${jsBody}
    };
    `
  );

  return factory(customConsole || console);
}

/**
 * Executes standalone Python statements (e.g. Puzzle Mode bot commands) with `bot` injected.
 */
export function executePythonWithBot(code: string, bot: Record<string, any>): void {
  const jsBody = transpilePythonBlock(code);
  const runner = new Function(
    'bot',
    `
    "use strict";
    ${PYTHON_RUNTIME}
    ${jsBody}
    `
  );
  runner(bot);
}
