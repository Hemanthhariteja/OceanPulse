export const createPageUrl = (pageName) => {
  const routes = {
    'Landing': '/',
    'EarthDeepDive': '/ocean-pulse',
    'About': '/about',
    'Models': '/models'
  };
  return routes[pageName] || '/';
};
