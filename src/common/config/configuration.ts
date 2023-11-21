export default () => {
  return {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      typeorm_synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      typeorm_logging: process.env.TYPEORM_LOGGING === 'true',
    },
    aws: {
      access_key_id: process.env.AWS_ACCESS_KEY_ID,
      secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      sdk_load_config: process.env.AWS_SDK_LOAD_CONFIG,
      s3_bucket_name: process.env.AWS_S3_BUCKET_NAME,
      s3_bucket_region: process.env.AWS_S3_BUCKET_REGION,
      region: process.env.AWS_REGION,
    },
    common: {
      port: parseInt(process.env.PORT, 10) || 3000,
      jwt_secret: process.env.JWT_SECRET_STRING,
    }
  };
};
