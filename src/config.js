exports.getConfig = () => {
  return {
    port: process.env.PORT || 3001,
    url: process.env.MONGODB_URL,
    mangoName: process.env.MONGO_NAME,
    allowedCorsOrigin: process.env.ALLOWED_CORS_ORIGIN,
  };
};
