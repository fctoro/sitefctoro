const { pool } = require('../lib/db');

async function q(sql, params = []) {
  const c = await pool.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}

async function run() {
  try {
    const compId = 'c972aad9-67d1-4afa-82a5-03e9daacf269';
    // Get all categories for this competition
    const { rows: cats } = await q("SELECT id, name FROM flagday_categories WHERE competition_id = $1 ORDER BY id ASC", [compId]);
    
    // Group by name
    const byName = {};
    for (const c of cats) {
      if (!byName[c.name]) byName[c.name] = [];
      byName[c.name].push(c.id);
    }
    
    for (const [name, ids] of Object.entries(byName)) {
      if (ids.length > 1) {
        console.log(`Fixing duplicates for ${name}`);
        const keepId = ids[0];
        const removeIds = ids.slice(1);
        
        for (const rid of removeIds) {
          // Check matches
          const { rows: m } = await q("SELECT count(*) as c FROM flagday_matches WHERE category_id = $1", [rid]);
          const { rows: mK } = await q("SELECT count(*) as c FROM flagday_matches WHERE category_id = $1", [keepId]);
          
          if (parseInt(mK[0].c) > 0 && parseInt(m[0].c) > 0) {
            console.log(`  Deleting ${m[0].c} old matches from category ${rid} to avoid duplicates`);
            await q("DELETE FROM flagday_matches WHERE category_id = $1", [rid]);
          } else {
            console.log(`  Moving matches from ${rid} to ${keepId}`);
            await q("UPDATE flagday_matches SET category_id = $1 WHERE category_id = $2", [keepId, rid]);
          }
          
          console.log(`  Moving standings and scorers from ${rid} to ${keepId}`);
          await q("UPDATE flagday_standings SET category_id = $1 WHERE category_id = $2", [keepId, rid]);
          await q("UPDATE flagday_top_scorers SET category_id = $1 WHERE category_id = $2", [keepId, rid]);
          
          console.log(`  Deleting duplicate category ${rid}`);
          await q("DELETE FROM flagday_categories WHERE id = $1", [rid]);
        }
      }
    }
    console.log('Deduplication complete!');
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

run();
