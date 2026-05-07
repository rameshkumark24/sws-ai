import DashboardHeader from "@/components/DashboardHeader";
import UploadCard from "@/components/UploadCard";
import DocumentTable from "@/components/DocumentTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <DashboardHeader
            title="Document Management"
            subtitle="Upload, organize, and manage your documents in one place"
          />

          <UploadCard />

          <DocumentTable />
        </div>
      </main>
    </div>
  );
}
