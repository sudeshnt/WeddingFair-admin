export const navItems = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Master Data',
    url: '/master-data',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Categories',
        url: '/master-data/categories',
        icon: 'icon-puzzle'
      },
      {
        name: 'Cities',
        url: '/master-data/cities',
        icon: 'icon-puzzle'
      }
    ]
  }
];
