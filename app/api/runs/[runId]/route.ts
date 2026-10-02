import { NextResponse } from "next/server";
import { getRunById, updateRun } from "@/lib/runs-db";
import { validateApiKey } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const run = await getRunById(runId);

    if (!run) {
      return NextResponse.json(
        { success: false, error: `Run with ID '${runId}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      run,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch run" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid or missing API key." },
      { status: 401 }
    );
  }

  try {
    const { runId } = await params;
    const body = await request.json();
    const updated = await updateRun(runId, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Run with ID '${runId}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      run: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update run" },
      { status: 500 }
    );
  }
}
