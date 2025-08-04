import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TodosView from "@/components/todos-view";

export default async function TodosPage() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name")
    .eq("user_id", user.id)
    .order("company_name");

  // TODO: Fetch todos from database when table is created
  const todos = [];

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">To Dos & Action Items</h1>
        <p className="text-gray-600">Track all tasks, feature requests, and action items for your customers.</p>
      </div>
      <div className="h-full bg-white rounded-lg shadow">
        <TodosView customers={customers || []} todos={todos} />
      </div>
    </div>
  );
} 