import { DesignOptionsDashboard } from "@/features/design-options/components/DesignOptionsDashboard";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-heading mb-1">
            Design Options App
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and compare design proposals
          </p>
        </div>
      </div>
      <div className="mt-5">
        <DesignOptionsDashboard />
      </div>
    </div>
  );
}
