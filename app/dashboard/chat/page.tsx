import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GlobalChat from "@/components/global-chat";

export default async function ChatPage() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name, contact_person, email, notes, pipeline_stage")
    .eq("user_id", user.id)
    .order("company_name");

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Chat</h1>
        <p className="text-gray-600">Chat with AI about your customers, pipeline, and business insights.</p>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <GlobalChat customers={customers || []} />
      </div>
    </div>
  );
} 