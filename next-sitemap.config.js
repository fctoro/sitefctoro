/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fctoro.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom logic for priority and changefreq
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (
      [
        '/actualites',
        '/club',
        '/equipes',
        '/evenements',
        '/formation',
        '/le-club',
        '/scouting',
        '/talents',
        '/ti-toro',
      ].includes(path)
    ) {
      priority = 0.9;
    } else if (['/contact', '/recrutement', '/inscription'].includes(path)) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
