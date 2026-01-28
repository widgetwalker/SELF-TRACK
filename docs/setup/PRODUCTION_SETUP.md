# Self-Track Production Setup Guide

This guide covers production deployment, security hardening, and optimization.

---

## 1. Environment Configuration

### Production .env File
```bash
# Backend Configuration
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/selftrack?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-long-random-secret-key-min-32-chars

# ML Service
ML_BASE_URL=http://ml-service:8000
ML_TIMEOUT=15000

# Email Service (recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/selftrack/app.log
```

### Security Best Practices
```bash
# ✅ DO
- Use strong random JWT_SECRET (64+ characters)
- Store secrets in environment variables only
- Rotate secrets monthly in production
- Use separate DB users with minimal permissions

# ❌ DON'T
- Commit .env files to git
- Use default/weak secrets
- Expose secrets in logs
- Reuse secrets across environments
```

---

## 2. Database Setup

### MongoDB Atlas Setup
1. Create cluster with auto-scaling enabled
2. Configure backups (daily, 30-day retention)
3. Create database user with minimal permissions

### Database Indexes
```bash
npm run seed:indexes
```

### Backup Strategy
```bash
# Daily backups
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/selftrack" \
  --out=/backups/$(date +%Y%m%d)
```

---

## 3. SSL/TLS Certificate

### Using Let's Encrypt
```bash
sudo certbot certonly --standalone -d yourdomain.com
```

### Nginx Configuration
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  
  location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# Redirect HTTP to HTTPS
server {
  listen 80;
  server_name yourdomain.com;
  return 301 https://$server_name$request_uri;
}
```

---

## 4. Docker Deployment

### Production Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY backend/src ./src
COPY frontend ./frontend

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "src/server.js"]
```

### Production docker-compose.yml
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - mongodb_backup:/backup
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    networks:
      - selftrack

  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    restart: always
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      MONGO_URI: mongodb://${MONGO_USER}:${MONGO_PASS}@mongodb:27017/selftrack
      JWT_SECRET: ${JWT_SECRET}
      ML_BASE_URL: http://ml-service:8000
    depends_on:
      - mongodb
    networks:
      - selftrack
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  ml-service:
    build:
      context: backend/ml-service
    restart: always
    ports:
      - "8000:8000"
    environment:
      LOG_LEVEL: info
    networks:
      - selftrack
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

volumes:
  mongodb_data:
  mongodb_backup:

networks:
  selftrack:
    driver: bridge
```

---

## 5. Performance Optimization

### API Response Caching
```javascript
const cache = require('express-cache-middleware');

app.use(cache.withCache(60, 'json')); // 60 second cache

// Cache specific endpoints
app.get('/api/skills/all', cache.withCache(300, 'json'), skillsController.getAllSkills);
```

### Database Query Optimization
```javascript
// Use indexes
db.collection.createIndex({ email: 1 });
db.collection.createIndex({ user: 1, isRead: 1 });

// Use projection
Task.find().select('title status assignedTo');

// Use lean for read-only
Notification.find().lean().exec();
```

### Load Balancing
```yaml
# nginx upstream
upstream backend {
  least_conn;
  server backend1:5000;
  server backend2:5000;
  server backend3:5000;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend;
  }
}
```

---

## 6. Monitoring & Logging

### Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start backend/src/server.js --name "selftrack" --watch

# Enable monitoring
pm2 monit
```

### Centralized Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '/var/log/selftrack/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/var/log/selftrack/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Sentry Integration
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});

app.use(Sentry.Handlers.errorHandler());
```

---

## 7. Rate Limiting & DDoS Protection

### Express Rate Limit
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  skipSuccessfulRequests: true
});

app.use('/api/', limiter);
app.post('/api/auth/login', authLimiter, authController.login);
```

### CloudFlare DDoS Protection
1. Set DNS to CloudFlare nameservers
2. Enable DDoS protection (free tier)
3. Configure firewall rules
4. Enable bot protection

---

## 8. Backup & Disaster Recovery

### Backup Strategy
```bash
#!/bin/bash
# Daily backup script
BACKUP_DATE=$(date +%Y%m%d)
mongodump --uri="$MONGO_URI" --out=/backups/selftrack_$BACKUP_DATE

# Keep only last 30 days
find /backups -type d -name "selftrack_*" -mtime +30 -exec rm -rf {} \;
```

### Recovery Procedure
```bash
# Restore from backup
mongorestore --uri="$MONGO_URI" /backups/selftrack_20260123/
```

---

## 9. Security Scanning

### Dependency Vulnerabilities
```bash
npm audit
npm audit fix

# Regular scans with Snyk
npx snyk test
```

### OWASP Security Testing
- Run OWASP ZAP scanner
- Check for SQL injection vulnerability
- Verify XSS protection
- Test CSRF protection
- Verify authentication flows

---

## 10. Deployment Checklist

### Pre-Deployment
- [ ] Review all environment variables
- [ ] Run test suite successfully
- [ ] Update database backup
- [ ] Review recent code changes
- [ ] Verify SSL certificate validity
- [ ] Test disaster recovery procedure

### Deployment
- [ ] Build Docker image
- [ ] Run integration tests
- [ ] Deploy to staging first
- [ ] Smoke test all endpoints
- [ ] Monitor error rates
- [ ] Verify database connections

### Post-Deployment
- [ ] Monitor logs for errors
- [ ] Check API response times
- [ ] Verify email notifications working
- [ ] Test all critical user flows
- [ ] Confirm backups running

---

## 11. Scaling Strategy

### Horizontal Scaling
```yaml
# kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: selftrack-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: selftrack
  template:
    metadata:
      labels:
        app: selftrack
    spec:
      containers:
      - name: backend
        image: selftrack:latest
        ports:
        - containerPort: 5000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Database Sharding
- Shard by user ID for horizontal scaling
- Implement connection pooling
- Set up read replicas for analytics

---

## 12. Cost Optimization

### Recommended Services
| Service | Cost | Alternative |
|---------|------|-------------|
| MongoDB Atlas | $57/month | Self-hosted MongoDB |
| Let's Encrypt | Free | Paid SSL certs |
| CloudFlare | Free | Paid CDN |
| SendGrid | $29+/month | Postmark, Mailgun |
| AWS S3 | $0.023/GB | Digital Ocean Spaces |
| Sentry | Free tier | Self-hosted |

---

## Final Checklist

- ✅ Environment configured
- ✅ Database indexed and backed up
- ✅ SSL/TLS enabled
- ✅ Docker containerized
- ✅ Rate limiting configured
- ✅ Monitoring set up
- ✅ Backups automated
- ✅ Security scanned
- ✅ Load balancing configured
- ✅ Disaster recovery tested

Ready for production deployment! ��

