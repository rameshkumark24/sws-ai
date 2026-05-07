"use client";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="text-base text-secondary sm:text-lg">{subtitle}</p>
    </div>
  );
}
