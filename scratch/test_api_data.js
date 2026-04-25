const { getFlagDayCmsData } = require('./lib/flag-day');

async function test() {
  try {
    const data = await getFlagDayCmsData();
    console.log('--- CATEGORIES ---');
    console.log(data.categories.map(c => c.name));
    
    console.log('--- STANDINGS (U9) ---');
    const u9Cat = data.categories.find(c => c.name === 'U9');
    const u9Standings = data.standings.filter(s => s.category_id === u9Cat.id);
    console.log(JSON.stringify(u9Standings, null, 2));
    
    console.log('--- SCORERS ---');
    console.log(JSON.stringify(data.scorers.slice(0, 5), null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
