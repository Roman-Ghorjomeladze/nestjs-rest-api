export const PublicRoutes = [
    '/api/auth/login', 
    '/api/auth/register',
    '/api/test'
]

export const AuthValidationTexts = {
    signUp: {
        email: "It should be valid email address. It shouldn't be empty",
        password: "Min 6 characters, should contain at least one number",
    },
    notEmpty: "It shouldn't be empty"
}