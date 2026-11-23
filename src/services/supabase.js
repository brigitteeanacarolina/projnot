import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zihxhgnvmiphardiotqe.supabase.co';
const supabaseKey = 'sb_publishable_fde2SSPOL65cvgW_ml-wHw_WUXLLJBE';

export const supabase = createClient(supabaseUrl, supabaseKey);