// Web Port
export const PORT = process.env.PORT || 8000;
export const WDS_PORT = 3030;

// Environments
export const inDevelopment = process.env.NODE_ENV === 'development';
export const inStaging = process.env.NODE_ENV === 'staging';
export const inProduction = process.env.NODE_ENV === 'production';

// Test Data
export const APP_NAME = 'This is app test';
