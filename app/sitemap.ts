import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fctoro.com';
  
  const routes = [
    '',
    '/actualites',
    '/casa',
    '/classement',
    '/club',
    '/contact',
    '/elite',
    '/equipes',
    '/evenements/flag-day',
    '/evenements/intrasquad',
    '/evenements/live',
    '/evenements/tournoi-international',
    '/evenements/vertieres-cup',
    '/formation',
    '/inscription',
    '/le-club',
    '/recrutement',
    '/scouting',
    '/sponsors',
    '/staff',
    '/stage',
    '/stages',
    '/talents',
    '/ti-toro',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 
              ['/actualites', '/club', '/equipes', '/evenements/tournoi-international'].includes(route) ? 0.9 :
              ['/contact', '/recrutement', '/inscription'].includes(route) ? 0.8 : 0.7,
  }));
}
