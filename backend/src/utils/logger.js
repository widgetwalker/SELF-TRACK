/**
 * Logger utility - logs to console with timestamps
 * Can be extended to log to files or external services
 */

const log = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(Object.keys(data).length && { data })
  };

  switch (level) {
    case 'ERROR':
      console.error(`[${timestamp}] ❌ ERROR:`, message, data);
      break;
    case 'WARN':
      console.warn(`[${timestamp}] ⚠️  WARN:`, message, data);
      break;
    case 'INFO':
      console.info(`[${timestamp}] ℹ️  INFO:`, message, data);
      break;
    case 'DEBUG':
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${timestamp}] 🐛 DEBUG:`, message, data);
      }
      break;
  }
};

module.exports = {
  error: (msg, data) => log('ERROR', msg, data),
  warn: (msg, data) => log('WARN', msg, data),
  info: (msg, data) => log('INFO', msg, data),
  debug: (msg, data) => log('DEBUG', msg, data)
};
