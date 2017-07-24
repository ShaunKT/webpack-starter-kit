// Web Port
export const PORT = process.env.PORT || 6060;
export const WDS_PORT = 8080;

// Environments
export const inDevelopment = process.env.NODE_ENV === 'development';
export const inStaging = process.env.NODE_ENV === 'staging';
export const inProduction = process.env.NODE_ENV === 'production';
