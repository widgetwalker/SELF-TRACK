# Self-Track User Guide

Complete guide for using the Self-Track workforce management system.

---

## Getting Started

### Login Credentials (Demo)
```
Employee Account:
Email: demo@selftrack.com
Password: demo123

Admin Account:
Email: admin@selftrack.com
Password: admin123
```

### First Time Setup
1. Visit http://localhost:3000
2. Login with demo credentials
3. Explore the dashboard
4. Check out your tasks, leaves, and skills

---

## User Features

### 📋 Task Management

**View Tasks**
- Navigate to "Tasks" in the sidebar
- See all tasks assigned to you
- Filter by status: Pending, In Progress, Completed

**Update Task Status**
- Click on any task
- Change status as you progress
- Task updates are saved automatically

**Task Priority Levels**
- 🔴 High - Urgent, needs immediate attention
- 🟡 Medium - Standard priority
- 🟢 Low - Can be done when time permits

### 🏖️ Leave Management

**Apply for Leave**
1. Go to "Leaves" section
2. Click "Request Leave"
3. Select start and end dates
4. Provide reason (vacation, sick leave, personal)
5. Submit for approval

**Check Leave Status**
- Pending: Waiting for admin approval
- Approved: Confirmed leave
- Rejected: Admin denied request

**View Leave Balance**
- Your leave history and remaining days

### 💼 Skills Management

**Update Your Skills**
1. Navigate to "Skills"
2. Add new skills you have
3. Rate your proficiency (1-5 scale)
   - 1: Beginner
   - 2: Elementary
   - 3: Intermediate
   - 4: Advanced
   - 5: Expert
4. Save changes

**Why Skills Matter**
- Helps in task assignment
- Shows growth and development
- Used in productivity calculations

### 💰 Salary & Payslips

**View Your Salary**
1. Go to "Salary" section
2. See monthly salary records
3. View breakdown:
   - Basic salary
   - Allowances
   - Deductions
   - Net pay

**Download Payslips**
- Payslips are available each month
- Download as PDF for records

### 📊 Performance Insights

**AI-Powered Analytics**

The system uses machine learning to provide insights:

**Productivity Scoring**
- Tracks your task completion rate
- Measures work efficiency
- Score: 0-100 (higher is better)

**Burnout Risk Assessment**
- Monitors workload and stress
- Risk levels: Low, Medium, High
- Recommendations for work-life balance

**Anomaly Detection**
- Identifies unusual patterns in your work
- Alerts if productivity drops significantly
- Helps maintain consistency

**Performance Recommendations**
- Personalized suggestions
- Based on your work patterns
- Actionable insights for improvement

### 🔔 Notifications

**Stay Updated**
- Get notified of:
  - New task assignments
  - Leave approvals/rejections
  - System announcements
  - Performance alerts

**Manage Notifications**
- Click notification bell icon
- View notification history
- Mark as read

---

## Admin Features

### 👥 Employee Management

**View All Employees**
1. Dashboard → Employees
2. See employee list with details
3. View individual profiles
4. Check their activity and performance

**Manage Tasks**
1. Create tasks for employees
2. Assign to specific users
3. Set priorities and deadlines
4. Track completion

**Approve Leaves**
1. Pending Leaves section
2. Review leave requests
3. Approve or reject
4. Add comments if needed

### 📈 Admin Analytics

**Dashboard Overview**
- Total employees
- Tasks completion rate
- Pending leave requests
- Average productivity
- Burnout risk summary

**Employee Analytics**
- Individual productivity scores
- Leave patterns
- Skill distribution
- Performance trends

**Reports**
- Generate monthly reports
- Export data
- Track metrics over time

### ⚙️ System Settings

**User Management**
- Add new employees
- Assign roles (Admin, Employee)
- Manage permissions
- Deactivate accounts

**System Health**
- Check backend status
- Verify ML service
- Monitor system performance

---

## Tips & Best Practices

### For Employees

1. **Update Tasks Regularly**
   - Keep task status current
   - Helps in accurate productivity tracking

2. **Maintain Skills Profile**
   - Add new skills as you learn
   - Helps in better task assignments

3. **Apply Leaves in Advance**
   - Plan ahead for approvals
   - Check leave balance before requesting

4. **Review Insights**
   - Check productivity score weekly
   - Monitor burnout risk
   - Follow recommendations

5. **Complete Profile**
   - Add profile picture
   - Keep contact information updated
   - Maintain skill certifications

### For Admins

1. **Regular Monitoring**
   - Check dashboard daily
   - Monitor productivity trends
   - Identify struggling employees

2. **Timely Approvals**
   - Review pending leaves regularly
   - Provide feedback on denials
   - Acknowledge work achievements

3. **Use Analytics**
   - Analyze team productivity
   - Identify bottlenecks
   - Plan resource allocation

4. **Fair Task Distribution**
   - Balance workload across team
   - Consider skill level
   - Set realistic deadlines

5. **Communication**
   - Use notifications effectively
   - Send updates to team
   - Share performance insights

---

## Common Questions

### Q: How is productivity calculated?
**A:** Based on completed tasks, leave frequency, and skills count. The ML model learns from historical data.

### Q: Can I change my password?
**A:** Yes, in the settings menu. Currently available in profile section.

### Q: What if I need to cancel a leave request?
**A:** Contact admin to withdraw pending requests.

### Q: How often are insights updated?
**A:** Productivity and burnout scores update daily based on latest data.

### Q: Can I export my data?
**A:** Admin can export employee data. Individual data exports coming soon.

### Q: What happens if ML service is down?
**A:** Analytics features use fallback values. Core functionality remains unaffected.

### Q: Is my data secure?
**A:** Yes! Data is encrypted, transmitted over HTTPS, and stored securely in MongoDB.

### Q: Can multiple people access the same account?
**A:** Not recommended. Each user should have unique credentials.

---

## Security & Privacy

### Your Data is Protected
- Passwords are hashed with bcryptjs
- JWT tokens for secure authentication
- HTTPS encryption (in production)
- No data sharing with third parties

### Password Security
- Use strong passwords (8+ chars, mix of letters/numbers)
- Don't share your login credentials
- Change password regularly
- Use unique password for this system

### What We Collect
- Name, email, and role
- Task completion data
- Leave requests
- Skills information
- Performance metrics (anonymized)

### Data Retention
- Active account: All data retained
- Inactive account: Data archived after 6 months
- Deleted account: Data permanently removed after 30 days

---

## Troubleshooting

### Can't login
- Verify email and password
- Check if account is active
- Try resetting password (admin feature)
- Clear browser cache and try again

### Tasks not showing
- Refresh the page
- Check task filter (might be filtered by status)
- Verify you're logged in
- Check backend health at /health

### Can't apply leave
- Ensure dates are in future
- Check leave balance
- Verify end date is after start date
- Contact admin if still issues

### Notifications not appearing
- Check notification permissions
- Verify backend connection
- Refresh notifications section
- Check system logs

### Performance data missing
- ML service might be processing
- Try refreshing after a minute
- Check backend health
- ML service requires sample data

---

## Contact & Support

### For Technical Issues
- Check INTEGRATION_GUIDE.md for architecture
- Review API_DOCUMENTATION.md for API details
- Check logs at `/var/log/selftrack/`

### For Feature Requests
- Create issue in repository
- Describe feature and use case
- Provide mockups if possible

### For Bugs
- Report with steps to reproduce
- Include error messages
- Share system details (browser, OS)

---

## Keyboard Shortcuts (Coming Soon)

- `Ctrl/Cmd + K`: Search
- `T`: Go to Tasks
- `L`: Go to Leaves
- `S`: Go to Skills
- `?`: Show help menu

---

## What's Coming Next

- 📱 Mobile app (iOS/Android)
- 📧 Email notifications
- 🔄 Real-time updates (WebSocket)
- 📂 File uploads and document management
- 📋 Performance reviews
- 🎯 Goal tracking system
- 👥 Team collaboration features
- 📞 Chat/messaging

---

## Version Info

**Current Version**: 1.0.0
**Last Updated**: January 2026
**API Version**: v1

---

## Quick Links

- 🏠 [Home](/)
- 📚 [API Docs](./API_DOCUMENTATION.md)
- ⚡ [Quick Start](./QUICK_START.md)
- 🔗 [Integration Guide](./INTEGRATION_GUIDE.md)
- 🚀 [Production Setup](./PRODUCTION_SETUP.md)

---

Enjoy using Self-Track! 🚀

