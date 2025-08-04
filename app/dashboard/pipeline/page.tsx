import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PipelineView from "@/components/pipeline-view";

export default async function PipelinePage() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name, pipeline_stage")
    .eq("user_id", user.id)
    .order("company_name");

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="text-gray-600">Visual overview of all customers in your sales pipeline.</p>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <PipelineView customers={customers || []} />
      </div>
    </div>
  );
} 