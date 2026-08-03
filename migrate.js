const { createClient } = require('@supabase/supabase-js');

async function migrate() {
  const cmsClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const smgClient = createClient(
    process.env.NEXT_PUBLIC_SMG_SUPABASE_URL,
    process.env.SMG_SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    console.log('Fetching from CMS database...');

    const { data: messages, error: msgError } = await cmsClient
      .from('site_messages')
      .select('*')
      .eq('type', 'joueur')
      .or('name.ilike.%Bernadin Djeff%,name.ilike.%Kenson ESTIRA%');

    if (msgError) throw msgError;

    console.log('Found ' + messages.length + ' messages to migrate.');

    for (const msg of messages) {
      console.log('Migrating message for: ' + msg.name);
      const payload = msg.payload;

      const { data: registration, error: regError } = await cmsClient
        .from('player_registrations')
        .select('*')
        .eq('guardian_name', payload.guardian_name)
        .eq('child_first_name', payload.child_first_name)
        .eq('child_last_name', payload.child_last_name)
        .single();

      if (regError && regError.code !== 'PGRST116') {
        throw regError;
      }

      if (registration) {
        console.log('Found registration. Migrating...');

        const { id, ...regData } = registration;
        const { data: smgReg, error: smgRegError } = await smgClient
          .from('player_registrations')
          .insert(regData)
          .select()
          .single();

        if (smgRegError) throw smgRegError;
        
        console.log('Inserted into SMG player_registrations.');

        await cmsClient.from('player_registrations').delete().eq('id', registration.id);
        console.log('Deleted from CMS player_registrations.');
      }

      const { id: msgId, ...msgData } = msg;
      const { error: smgMsgError } = await smgClient
        .from('site_messages')
        .insert(msgData);

      if (smgMsgError) throw smgMsgError;
      console.log('Inserted into SMG site_messages.');

      await cmsClient.from('site_messages').delete().eq('id', msg.id);
      console.log('Deleted from CMS site_messages.');
    }
    console.log('Migration complete.');
  } catch (err) {
    console.error('Error during migration:', err);
  }
}

migrate();
