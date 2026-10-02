import fs from "fs/promises";
import path from "path";
import { TestRun } from "@/types/test-run";
import { initialTestRuns } from "@/data/initial-runs";

// Persistence file location (with /tmp fallback for read-only serverless runtimes)
const PRIMARY_STORE_PATH = path.join(process.cwd(), "data", "runs-store.json");
const TMP_STORE_PATH = "/tmp/rewardly-runs-store.json";

// In-memory cache for fast responses
let memoryRunsCache: TestRun[] | null = null;

async function getStorePath(): Promise<string> {
  try {
    const dir = path.dirname(PRIMARY_STORE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.access(dir, fs.constants.W_OK);
    return PRIMARY_STORE_PATH;
  } catch {
    return TMP_STORE_PATH;
  }
}

/**
 * Loads all test runs from store, initializing with sample runs if empty
 */
export async function getAllRuns(): Promise<TestRun[]> {
  if (memoryRunsCache && memoryRunsCache.length > 0) {
    return memoryRunsCache;
  }

  const storePath = await getStorePath();

  try {
    const raw = await fs.readFile(storePath, "utf-8");
    const parsed: TestRun[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryRunsCache = parsed;
      return parsed;
    }
  } catch {
    // File doesn't exist yet or cannot be parsed; initialize with initialTestRuns
  }

  memoryRunsCache = [...initialTestRuns];
  try {
    await fs.writeFile(storePath, JSON.stringify(memoryRunsCache, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist initial runs to disk:", err);
  }

  return memoryRunsCache;
}

/**
 * Retrieves a single test run by ID
 */
export async function getRunById(id: string): Promise<TestRun | null> {
  const runs = await getAllRuns();
  return runs.find((r) => r.id === id) || null;
}

/**
 * Creates or overwrites a test run
 */
export async function saveRun(run: TestRun): Promise<TestRun> {
  const runs = await getAllRuns();
  const index = runs.findIndex((r) => r.id === run.id);

  if (index >= 0) {
    runs[index] = run;
  } else {
    runs.unshift(run); // Add new run to top of list
  }

  memoryRunsCache = runs;
  const storePath = await getStorePath();

  try {
    await fs.writeFile(storePath, JSON.stringify(runs, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist run to disk:", err);
  }

  return run;
}

/**
 * Updates partial fields on an existing test run
 */
export async function updateRun(id: string, updates: Partial<TestRun>): Promise<TestRun | null> {
  const runs = await getAllRuns();
  const index = runs.findIndex((r) => r.id === id);
  if (index === -1) return null;

  runs[index] = {
    ...runs[index],
    ...updates,
  };

  memoryRunsCache = runs;
  const storePath = await getStorePath();

  try {
    await fs.writeFile(storePath, JSON.stringify(runs, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist run update to disk:", err);
  }

  return runs[index];
}
