export const navItems = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Master Data',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Categories',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Sub Categories',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      }
    ]
  }
];
