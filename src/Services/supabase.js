import {createClient} from "@supabase/supabase-js"

const supabaseUrl = " Sua Url ";
const supabaseKey = " Sua chave de API ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

