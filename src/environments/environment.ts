
export const environment = {
  production: false,
  server: {
    host: 'base.cms.local',
    ssl: true,
    port: '',
    prefix: 'api',
    paths: {
        auth: {
            login: 'login',
            register: 'register',
            logout: 'logout',
            changePw: 'change-pass',
            refresh: 'refresh',
        },
        user: {
            profile: 'user-profile',
        },
        routes: {
            list: 'routes'
        },
        role: {
            list: 'role',
            create: 'role/create',
            update: 'role/update',
            delete: 'role',
        },
        post: {
            list: 'post',
        }
    }
  }
};
