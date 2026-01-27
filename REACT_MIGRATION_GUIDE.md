# 🚀 React Frontend Migration Guide

The Self-Track project is transitioning to a modern React-based frontend with smooth animations and transitions!

---

## 📊 What's New

### ✅ Completed
- [x] React project structure setup
- [x] Page transitions with Framer Motion
- [x] Navigation component with smooth animations
- [x] HomePage with feature showcase
- [x] LoginPage with form handling
- [x] DashboardPage with stats cards
- [x] Global CSS with modern design
- [x] Authentication context setup
- [x] API client integration ready

### 🚀 Ready to Build
- [ ] TasksPage component
- [ ] LeavesPage component
- [ ] SkillsPage component
- [ ] SalaryPage component
- [ ] AdminDashboardPage component
- [ ] PerformanceInsightPage component
- [ ] Notifications component
- [ ] Unit tests

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html           (HTML entry point)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   (Nav bar with smooth transitions)
│   │   ├── Navigation.css
│   │   └── PageTransition.jsx (Page animation wrapper)
│   ├── pages/
│   │   ├── HomePage.jsx     (Landing page)
│   │   ├── HomePage.css
│   │   ├── LoginPage.jsx    (Auth page)
│   │   ├── LoginPage.css
│   │   ├── DashboardPage.jsx (Main dashboard)
│   │   ├── DashboardPage.css
│   │   ├── TasksPage.jsx    (TBD)
│   │   ├── LeavesPage.jsx   (TBD)
│   │   ├── SkillsPage.jsx   (TBD)
│   │   ├── SalaryPage.jsx   (TBD)
│   │   ├── AdminDashboardPage.jsx (TBD)
│   │   └── PerformanceInsightPage.jsx (TBD)
│   ├── context/
│   │   └── AuthContext.js   (Auth state management)
│   ├── styles/
│   │   └── global.css       (Global styles & animations)
│   ├── utils/
│   │   └── (utility functions)
│   ├── App.jsx              (Main app component)
│   └── index.jsx            (React entry point)
├── api-client-improved.js   (Existing API client)
└── package.json             (Dependencies)
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation Steps

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Build for production
npm build
```

### Available Scripts
- `npm start` - Run development server (http://localhost:3000)
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

---

## �� Design System

### Colors
```css
--primary: #2563eb        /* Blue */
--secondary: #7c3aed      /* Purple */
--success: #10b981        /* Green */
--warning: #f59e0b        /* Amber */
--danger: #ef4444         /* Red */
```

### Transitions
- Fast: 150ms
- Base: 250ms (default)
- Slow: 350ms

### Components

#### Button States
```jsx
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-success">Success</button>
<button className="btn-danger">Danger</button>
```

#### Card Component
```jsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

#### Form Group
```jsx
<div className="form-group">
  <label>Field Label</label>
  <input type="text" />
</div>
```

---

## 🎬 Animation Features

### Page Transitions
All pages automatically fade in and slide up:
```jsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

### Component Animations
Use Framer Motion for component-level animations:
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

### Hover Effects
Cards and buttons have automatic hover animations:
- Smooth shadow increase
- Subtle scale/translate transforms
- Color transitions

---

## 🔐 Authentication Flow

### Login Process
1. User enters email/password on LoginPage
2. API client sends request to `/api/auth/login`
3. Token stored in localStorage
4. Auth context updated
5. User redirected to dashboard

### Protected Routes
Routes are automatically protected:
```jsx
{auth && (
  <>
    <Route path="/dashboard" element={<DashboardPage />} />
    {/* Other protected routes */}
  </>
)}
```

---

## 📱 Responsive Design

All components are fully responsive:
- Mobile: Single column layouts
- Tablet: 2-column grids
- Desktop: 3-4 column grids

### Breakpoints
- 768px: Mobile → Tablet
- 1024px: Tablet → Desktop

---

## 🚀 Building Next Pages

### Template for New Page
```jsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';
import './PageName.css';

const PageNamePage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <PageTransition>
      <Navigation />
      <div className="page-container">
        {/* Your content */}
      </div>
    </PageTransition>
  );
};

export default PageNamePage;
```

### CSS Template
```css
.page-container {
  min-height: calc(100vh - 70px);
  padding: 40px 20px;
  background: #f9fafb;
}

/* Your styles */

@media (max-width: 768px) {
  /* Mobile styles */
}
```

---

## �� API Integration

The existing `api-client-improved.js` is fully integrated:

```jsx
import apiClient from '../../api-client-improved';

// In your component
const handleFetch = async () => {
  try {
    const data = await apiClient.getTasks();
    setTasks(data.tasks);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Available API Methods
- `apiClient.login(email, password)`
- `apiClient.getTasks()`
- `apiClient.createTask(data)`
- `apiClient.updateTaskStatus(id, status)`
- `apiClient.applyLeave(data)`
- `apiClient.getMyLeaves()`
- `apiClient.getMySkills()`
- `apiClient.updateMySkills(skills)`
- `apiClient.getMySalary()`
- `apiClient.getNotifications()`
- And more...

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend directory:
```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
Coming soon with Cypress

---

## 📦 Dependencies

Key packages used:
- **react** - UI library
- **react-router-dom** - Client-side routing
- **framer-motion** - Animations
- **axios** - HTTP client
- **react-scripts** - Build tools

---

## 🎯 Roadmap

### Phase 1 (Current)
- [x] React setup
- [x] Basic pages (Home, Login, Dashboard)
- [x] Navigation
- [x] Transitions

### Phase 2 (Next)
- [ ] Complete all feature pages
- [ ] Form validation
- [ ] Error handling UI
- [ ] Loading states
- [ ] Toasts/notifications

### Phase 3
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] PWA features

### Phase 4
- [ ] Dark mode
- [ ] i18n (Internationalization)
- [ ] Advanced analytics
- [ ] Real-time updates (WebSocket)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### API Connection Issues
- Ensure backend is running on http://localhost:5000
- Check CORS settings in backend
- Verify API_BASE_URL in config

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)

---

## 🤝 Contributing

When adding new pages:
1. Create component in `src/pages/`
2. Create styles in same directory
3. Add route to App.jsx
4. Wrap content with `PageTransition`
5. Import `Navigation` component
6. Use existing API client for data

---

## ✨ Best Practices

1. **Always use PageTransition wrapper** for page-level components
2. **Import Navigation** for authenticated pages
3. **Use motion.div** for complex animations
4. **Leverage CSS classes** for simple transitions
5. **Keep components focused** on single responsibility
6. **Use AuthContext** for user data
7. **Handle loading and error states**
8. **Test on mobile** before committing

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review existing page examples
3. Refer to package documentation
4. Check backend logs for API issues

---

**Happy coding!** 🎉

Last Updated: January 23, 2026
