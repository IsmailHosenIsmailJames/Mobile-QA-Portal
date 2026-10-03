import { notFound } from "next/navigation";
import { getRunById, getAllRuns } from "@/lib/runs-db";
import RunDetailClient from "@/components/RunDetailClient";

export const revalidate = 0;
export const dynamicParams = true;

interface RunPageProps {
  params: Promise<{ runId: string }>;
}

export async function generateStaticParams() {
  const runs = await getAllRuns();
  return runs.map((r) => ({ runId: r.id }));
}

export default async function RunDetailPage({ params }: RunPageProps) {
  const { runId } = await params;
  const run = await getRunById(runId);

  if (!run) {
    notFound();
  }

  return <RunDetailClient run={run} />;
}
