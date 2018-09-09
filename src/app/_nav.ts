export const navItemsForXAdmin = [
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
  },
  {
    name: 'Vendors',
    url: '/vendors',
    icon: 'icon-puzzle',
  }
];

export const navItemsForVendor = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'My Profile',
    url: '/my-profile',
    icon: 'icon-puzzle',
  }
];
