const axios = require('axios');
const ML_BASE_URL = 'http://localhost:8000';

exports.getProductivityScore = async (features) => {
  const res = await axios.post(
    `${ML_BASE_URL}/predict/productivity`,
    features
  );
  return res.data;
};

exports.getBurnoutRisk = async (features) => {
  const res = await axios.post(
    `${ML_BASE_URL}/predict/burnout`,
    features
  );
  return res.data;
};

exports.getAnomalyResult = async (features) => {
  const res = await axios.post(
    `${ML_BASE_URL}/predict/anomaly`,
    features
  );
  return res.data;
};

exports.getPerformanceInsights = async (features) => {
  const res = await axios.post(
    `${ML_BASE_URL}/predict/insights`,
    features
  );
  return res.data;
};
