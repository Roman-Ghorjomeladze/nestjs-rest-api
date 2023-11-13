export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt_secret: process.env.JWT_SECRET_STRING,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        typeorm_synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
        typeorm_logging: process.env.TYPEORM_LOGGING === 'true',
    },
});