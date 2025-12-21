const express = require('express');
const cors = require('cors');

const adminRoutes = require('./routes/admin.routes');
const taskRoutes = require('./routes/task.routes');
const leaveRoutes = require('./routes/leave.routes');
const skillRoutes = require('./routes/skill.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const salaryRoutes = require('./routes/salary.routes');
const notificationRoutes = require('./routes/notification.routes');
const analyticsRoutes = require('./routes/analytics.routes');



const app = express();

app.use(cors());
app.use(express.json());

//  AUTH ROUTES
app.use('/api/auth', require('./routes/auth.routes'));

//  ADMIN ROUTES
app.use('/api/admin', adminRoutes);
//  register ROUTES
app.use('/api/tasks', taskRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);



app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Self Tracking Backend is running'
  });
});

module.exports = app;


