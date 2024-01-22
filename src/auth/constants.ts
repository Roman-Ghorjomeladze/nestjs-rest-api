export const PublicRoutes = ['/api/auth/login', '/api/auth/register', '/api'];

export const AuthValidationTexts = {
  auth: {
    email: "It should be valid email address. It shouldn't be empty",
    password: 'Min 6 characters, should contain at least one number',
    refresh: 'It should not be empty',
  },
  notEmpty: "It shouldn't be empty",
};
