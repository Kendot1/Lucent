"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { tradeSchema } from "@/lib/validations";

export async function createTradeAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  // Parse basic string data
  const rawData = {
    instrument: formData.get("instrument"),
    direction: formData.get("direction"),
    status: formData.get("status") || "open",
    outcome: formData.get("outcome") || null,
    entry_price: Number(formData.get("entry_price")),
    stop_loss: formData.get("stop_loss") ? Number(formData.get("stop_loss")) : null,
    take_profit: formData.get("take_profit") ? Number(formData.get("take_profit")) : null,
    exit_price: formData.get("exit_price") ? Number(formData.get("exit_price")) : null,
    position_size: formData.get("position_size") ? Number(formData.get("position_size")) : null,
    risk_amount: formData.get("risk_amount") ? Number(formData.get("risk_amount")) : null,
    reward_amount: formData.get("reward_amount") ? Number(formData.get("reward_amount")) : null,
    entry_time: formData.get("entry_time"),
    exit_time: formData.get("exit_time") || null,
    session: formData.get("session") || null,
    timeframe: formData.get("timeframe") || null,
    setup_type: formData.get("setup_type") || null,
    notes: formData.get("notes") || null,
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    tags: formData.getAll("tags"), // Multiple tags
  };

  // Validate
  const validated = tradeSchema.safeParse(rawData);
  
  if (!validated.success) {
    return { error: "Validation failed", details: validated.error.flatten() };
  }

  const { tags, ...tradeData } = validated.data;

  // Insert Trade
  const { data: trade, error } = await supabase
    .from("trades")
    .insert({
      ...tradeData,
      user_id: user.id,
    })
    .select("id")
    .single();

  if (error) {
    console.error("DB Error:", error);
    return { error: "Failed to create trade" };
  }

  // Insert Confluence Tags if any
  if (tags && tags.length > 0) {
    const tagInserts = tags.map((tag_id) => ({
      trade_id: trade.id,
      tag_id,
      user_id: user.id,
    }));
    
    await supabase.from("trade_confluences").insert(tagInserts);
  }

  revalidatePath("/");
  revalidatePath("/journal");
  revalidatePath("/analytics");

  return { success: true };
}

export async function updateTradeAction(tradeId: string, updates: Partial<any>) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("trades")
    .update(updates)
    .eq("id", tradeId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error on update:", error);
    return { error: "Failed to update trade" };
  }

  revalidatePath("/");
  revalidatePath("/journal");
  revalidatePath("/analytics");
  revalidatePath("/market");

  return { success: true };
}
