export const ROLES ={
    SUPER_ADMIN:'ROLE_SUPER_ADMIN',
    ADMIN :'ROLE_ADMIN',
    USER: 'ROLE_USER'
} as const;

export const ROLE_ROUTES = {
  ROLE_SUPER_ADMIN: '/dashboard-superAdmin',
  ROLE_ADMIN: '/dashboard-admin',
  ROLE_USER: '/dashboard-user'
} as const;

export type RoleRouteKey = keyof typeof ROLE_ROUTES;