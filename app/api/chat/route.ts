import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, customers } = await request.json();

    if (!message || !customers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    // Prepare customer context for the AI
    const customerContext = customers.map((customer: { company_name: string; contact_person?: string; email?: string; pipeline_stage?: string; notes?: string }) => ({
      company: customer.company_name,
      contact: customer.contact_person,
      email: customer.email,
      stage: customer.pipeline_stage,
      notes: customer.notes
    }));

    // Create the system prompt with customer context
    const systemPrompt = `You are an AI assistant helping with a CRM system. You have access to the following customer information:

${customerContext.map((c: { company: string; contact?: string; email?: string; stage?: string; notes?: string }) => 
  `- ${c.company} (${c.contact || 'No contact'}, ${c.email || 'No email'}, Stage: ${c.stage || 'No stage'}, Notes: ${c.notes || 'No notes'})`
).join('\n')}

You can help with:
- Pipeline analysis and stage breakdown
- Customer insights and recommendations
- Follow-up suggestions and action items
- Business insights based on customer data
- Sales strategy recommendations

Provide helpful, actionable advice based on the customer data available. Keep responses concise but informative.`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 