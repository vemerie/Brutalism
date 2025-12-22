const URIS = {
 authentication: {
  login: '/auth/login',
  changePassword: '/auth/change-password',
 },
 modules: {
  marketting: {
   index: '/marketting',
  },
  email: {
   index: '/emails',
  },

 },
} as const;

export default URIS;
