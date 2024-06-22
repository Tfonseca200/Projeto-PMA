import {createClient} from "@supabase/supabase-js"

const supabaseUrl = "https://iygpdxxrswvvqtmkofef.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Z3BkeHhyc3d2dnF0bWtvZmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MTkzMjAsImV4cCI6MjAzMzA5NTMyMH0.unNaLtYtr-o5TEcFfBHgkU2YPrbnd-QSUF-DHJNUdWU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

