const axios = require('axios');
require('dotenv').config();

const ML_BASE_URL = process.env.ML_BASE_URL || 'http://localhost:8000';
const ML_TIMEOUT = process.env.ML_TIMEOUT || 10000;
const MAX_RETRIES = 3;

// Create axios instance with timeout and retries
const mlClient = axios.create({
  baseURL: ML_BASE_URL,
  timeout: ML_TIMEOUT,
});

// Retry interceptor
mlClient.interceptors.response.use(null, async (error) => {
  const config = error.config;
  
  if (!config || !config.retry) {
    config.retry = 0;
  }

  config.retry += 1;

  if (config.retry <= MAX_RETRIES && !error.response) {
    await new Promise(resolve => setTimeout(resolve, 1000 * config.retry));
    return mlClient(config);
  }

  return Promise.reject(error);
});

const DEFAULT_RESPONSE = {
  success: false,
  message: 'ML service unavailable. Using default response.',
  fallback: true,
};

exports.getProductivityScore = async (features) => {
  try {
    const res = await mlClient.post('/predict/productivity', features);
    return res.data;
  } catch (error) {
    console.error('ML Service Error (Productivity):', error.message);
    return {
      ...DEFAULT_RESPONSE,
      productivity_score: 70, // default fallback score
    };
  }
};

exports.getBurnoutRisk = async (features) => {
  try {
    const res = await mlClient.post('/predict/burnout', features);
    return res.data;
  } catch (error) {
    console.error('ML Service Error (Burnout):', error.message);
    return {
      ...DEFAULT_RESPONSE,
      burnout_risk: 'low', // safe default
      confidence: 0.5,
    };
  }
};

exports.getAnomalyResult = async (features) => {
  try {
    const res = await mlClient.post('/predict/anomaly', features);
    return res.data;
  } catch (error) {
    console.error('ML Service Error (Anomaly):', error.message);
    return {
      ...DEFAULT_RESPONSE,
      anomaly: false,
      severity: 'none',
    };
  }
};

exports.getPerformanceInsights = async (features) => {
  try {
    const res = await mlClient.post('/predict/insights', features);
    return res.data;
  } catch (error) {
    console.error('ML Service Error (Insights):', error.message);
    return {
      ...DEFAULT_RESPONSE,
      insights: 'ML service temporarily unavailable. Please try again later.',
    };
  }
};

// Health check for ML service
exports.checkMLServiceHealth = async () => {
  try {
    const res = await mlClient.get('/health');
    return { healthy: true, message: 'ML Service is running' };
  } catch (error) {
    return {
      healthy: false,
      message: 'ML Service is unavailable',
      error: error.message,
    };
  }
};
