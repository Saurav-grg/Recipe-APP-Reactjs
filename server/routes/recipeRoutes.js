const express = require('express');
const router = express.Router();
const { getRecipes } = require('../controller/recipeControl');

router.get('/search/:query', getRecipes);
module.exports = router;
