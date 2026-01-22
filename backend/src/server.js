const app = require('./app');
const { port } = require('./config/env');
const connectDB = require('./config/db');

connectDB();

app.listen(port, () => {
  console.log(` Self-Track Server running on http://localhost:${port}`);
  console.log(` Access the application at: http://localhost:${port}`);
});
