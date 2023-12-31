export const SIDENAV_MENU = [
    {
        title: 'Location',
        icon: 'assets/icons/spec.svg',
        state: 'collapsed',
        submenuItems: [
            { label: 'Partner', url: 'partner' },
            // { label: 'Country', url: 'country' },
            { label: 'Region', url: 'region' },
        ]
    },
    {
        title: 'Service',
        icon: 'assets/icons/part-name.svg',
        state: 'collapsed',
        submenuItems: [
            { label: 'Planning', url: 'planning' },
            { label: 'Package', url: 'package' },
            { label: 'Blog', url: 'blog' },
        ]
    },
    {
        title: 'Settings',
        icon: 'assets/icons/setting.svg',
        state: 'collapsed',
        submenuItems: [
            { label: 'Users', url: 'users' },
            { label: 'Permissions', url: 'roles' },
        ]
    }
];