import { Mission, TestCase } from '../types/Mission';
import { pythonEngine, PythonExecutionResult } from './pythonRuntime';

export interface TestCaseResult {
  testCaseId: string;
  description: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  error?: string;
  executionTimeMs: number;
}

export interface ValidationSummary {
  allPassed: boolean;
  totalTests: number;
  passedTests: number;
  results: TestCaseResult[];
  lastResult?: PythonExecutionResult;
}

/**
 * Normalizes output string for fair comparison: trims trailing whitespace and windows newlines
 */
export function normalizeOutput(str: string): string {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

/**
 * Compare two values or output blocks with float tolerance
 */
export function compareOutputs(actual: string, expected: string): boolean {
  const normActual = normalizeOutput(actual);
  const normExpected = normalizeOutput(expected);

  if (normActual === normExpected) return true;

  // Attempt numeric float comparison if single numbers
  const numActual = parseFloat(normActual);
  const numExpected = parseFloat(normExpected);
  if (!isNaN(numActual) && !isNaN(numExpected)) {
    return Math.abs(numActual - numExpected) < 0.001;
  }

  // Check if expected is contained or matches line by line
  return false;
}

/**
 * Validate code against all test cases of a mission
 */
export async function validateMissionCode(
  mission: Mission,
  userCode: string
): Promise<ValidationSummary> {
  const results: TestCaseResult[] = [];
  let allPassed = true;
  let lastResult: PythonExecutionResult | undefined;

  for (const tc of mission.testCases) {
    // Parse simulated inputs if provided
    const inputQueue: string[] = tc.input
      ? tc.input.split('\n').filter(Boolean)
      : [];

    const execResult = await pythonEngine.execute(userCode, inputQueue);
    lastResult = execResult;

    if (execResult.error) {
      results.push({
        testCaseId: tc.id,
        description: tc.description,
        passed: false,
        actualOutput: execResult.stdout || execResult.stderr,
        expectedOutput: tc.expectedOutput,
        error: execResult.error,
        executionTimeMs: execResult.executionTimeMs,
      });
      allPassed = false;
    } else {
      const isMatch = compareOutputs(execResult.stdout, tc.expectedOutput);
      if (!isMatch) {
        allPassed = false;
      }
      results.push({
        testCaseId: tc.id,
        description: tc.description,
        passed: isMatch,
        actualOutput: execResult.stdout,
        expectedOutput: tc.expectedOutput,
        executionTimeMs: execResult.executionTimeMs,
      });
    }
  }

  return {
    allPassed,
    totalTests: mission.testCases.length,
    passedTests: results.filter(r => r.passed).length,
    results,
    lastResult,
  };
}
