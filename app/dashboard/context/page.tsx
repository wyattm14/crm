import ContextTabs from "@/components/context-tabs";

export default function ContextPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Company Context</h1>
        <p className="text-gray-600">Manage your company information, products, and policies.</p>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <ContextTabs />
      </div>
    </div>
  );
} 