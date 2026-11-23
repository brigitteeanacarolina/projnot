import { supabase } from '../services/supabase';

export async function sendNotification(title, body) {
  const { error } = await supabase
    .from('notifications')
    .insert([{ title, body }]);

  if (error) {
    console.log('Erro:', error.message);
    return false;
  }

  return true;
}

export function listenNotifications(onNotification) {
  const channel = supabase
    .channel('notifications-realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
      },
      (payload) => onNotification(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}