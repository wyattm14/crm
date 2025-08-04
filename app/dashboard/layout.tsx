import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CustomerSidebar from "@/components/customer-sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { redirect("/sign-in"); }

  const { data: customers } = await supabase
    .from("customers")
    .select("id, company_name")
    .eq("user_id", user.id)
    .order("company_name");

  return (
    <div className="h-screen bg-gray-50 flex">
      <CustomerSidebar customers={customers || []} user={user} />
      <main className="flex-1 overflow-auto">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
