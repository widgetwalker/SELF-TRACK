const axios = require("axios");

const BACKEND_BASE_URL = "http://localhost:5000";

exports.runProductivityForUser = async (userId, token) => {
  try {
    await axios.post(
      `${BACKEND_BASE_URL}/api/ml/productivity`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    console.error("AUTO ML FAILED:", err.message);
  }
};
