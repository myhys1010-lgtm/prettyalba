import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zacfzjxmkteowsrojvfj.supabase.co";
const supabaseKey = "sb_publishable_VT8r2__uaRjuBf_lrGaS6g_qu-6_fL4";

export const supabase = createClient(supabaseUrl, supabaseKey);