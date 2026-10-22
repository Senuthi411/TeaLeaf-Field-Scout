export const identityRoutes = [
  { key: 'dashboard', path: '/admin', label: 'Dashboard', permission: null },
  { key: 'users', path: '/admin/users', label: 'Users', permission: 'identity.users.admin' },
  { key: 'user-detail', path: '/admin/users/detail', label: 'User details', permission: 'identity.users.admin' },
  { key: 'create-user', path: '/admin/users/new', label: 'Create user', permission: 'identity.users.admin' },
  { key: 'edit-user', path: '/admin/users/edit', label: 'Edit user', permission: 'identity.users.admin' },
  { key: 'roles', path: '/admin/roles', label: 'Roles & Permissions', permission: 'identity.scopes.admin' },
  { key: 'scope', path: '/admin/scopes', label: 'Scope assignments', permission: 'identity.scopes.admin' },
  { key: 'estates', path: '/admin/estates', label: 'Estates', permission: 'identity.estates.admin' },
  { key: 'estate-detail', path: '/admin/estates/detail', label: 'Estate details', permission: 'identity.estates.admin' },
  { key: 'divisions', path: '/admin/divisions', label: 'Divisions', permission: 'identity.divisions.admin' },
  { key: 'division-detail', path: '/admin/divisions/detail', label: 'Division details', permission: 'identity.divisions.admin' },
  { key: 'sessions', path: '/admin/devices', label: 'Device Sessions', permission: 'identity.devices.admin' },
  { key: 'profile', path: '/profile', label: 'My Profile', permission: null },
] as const;
export type ScreenKey = (typeof identityRoutes)[number]['key'];
