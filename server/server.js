const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
if (process.env.NODE_ENV === 'production') {
  console.log('server started on production');
  const rootDir = path.resolve(__dirname, '..');
  app.use(express.static(path.join(rootDir, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'client', 'dist', 'index.html'));
  });
}
app.listen(3000, () => {
  console.log('server started on port 3000');
});
