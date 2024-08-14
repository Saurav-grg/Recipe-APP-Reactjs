const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe } = require('../controller/recipeControl');

router.get('/search/:query', getRecipes);
router.get('/:id', getRecipe);

module.exports = router;
