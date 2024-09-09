const express = require('express');
const app = express();
// const cors = require('cors');
const path = require('path');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
app.use(express.json());
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// const __dirname = path.resolve();
app.use('/api/recipes', recipeRoutes);
if (process.env.NODE_ENV === 'production') {
  console.log('server started on production');
  // console.log(__dirname);
  const rootDir = path.resolve(__dirname, '..');
  app.use(express.static(path.join(rootDir, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'client', 'dist', 'index.html'));
  });
}
app.listen(3000, () => {
  console.log('server started on port 3000');
});
