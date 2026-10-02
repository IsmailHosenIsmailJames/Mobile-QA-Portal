import { NextResponse } from "next/server";
import { getAllRuns, saveRun } from "@/lib/runs-db";
import { validateApiKey } from "@/lib/auth";
import { TestRun } from "@/types/test-run";

export async function GET() {
  try {
    const runs = await getAllRuns();
    return NextResponse.json({
      success: true,
      count: runs.length,
      runs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch runs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid or missing x-api-key / Bearer token." },
      { status: 401 }
    );
  }

  try {
    const body: TestRun = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Missing required 'id' field for test run." },
        { status: 400 }
      );
    }

    const saved = await saveRun(body);
    return NextResponse.json({
      success: true,
      message: `Test run ${saved.id} registered successfully`,
      run: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save test run" },
      { status: 500 }
    );
  }
}
