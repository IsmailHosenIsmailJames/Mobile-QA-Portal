import { notFound } from "next/navigation";
import { getRunById, getAllRuns } from "@/lib/runs-db";
import ScreenshotsPageClient from "@/components/ScreenshotsPageClient";

export const revalidate = 0;
export const dynamicParams = true;

interface ScreenshotsPageProps {
  params: Promise<{ runId: string }>;
}

export async function generateStaticParams() {
  const runs = await getAllRuns();
  return runs.map((r) => ({ runId: r.id }));
}

export default async function ScreenshotsPage({ params }: ScreenshotsPageProps) {
  const { runId } = await params;
  const run = await getRunById(runId);

  if (!run) {
    notFound();
  }

  return <ScreenshotsPageClient run={run} />;
}
