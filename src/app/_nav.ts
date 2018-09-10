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
        icon: 'icon-layers'
      },
      {
        name: 'Cities',
        url: '/master-data/cities',
        icon: 'icon-compass'
      }
    ]
  },
  {
    name: 'Vendors',
    url: '/vendors',
    icon: 'icon-people',
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
    icon: 'icon-user',
  },
  {
    name: 'Media',
    url: '/media',
    icon: 'fa fa-file-photo-o',
  },
  {
    name: 'Location',
    url: '/location',
    icon: 'icon-location-pin',
  }
];
