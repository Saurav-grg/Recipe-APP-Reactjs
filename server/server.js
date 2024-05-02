const express = require('express');
const app = express();
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
app.get('/', (req, res) => {
  res.json('Hello World');
});
app.use('/api/recipes', recipeRoutes);

app.listen(3000, () => {
  console.log('server started on port 3000');
});
