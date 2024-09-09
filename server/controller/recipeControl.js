const axios = require('axios');
require('dotenv').config();

const getRecipes = async (req, res) => {
  try {
    const { query } = req.params;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&random=true`;
    //&random=true&field=externalId&field=uri&field=image&field=label&field=images&field=calories&field=totalTime
    console.log(url);
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;
      res.status(200).json(data);
    } else {
      // Handle unexpected HTTP status codes
      res
        .status(response.status)
        .send({ error: `Unexpected status: ${response.status}` });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
    console.log(url);
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;
      res.status(200).json(data);
    } else {
      // Handle unexpected HTTP status codes
      res
        .status(response.status)
        .send({ error: `Unexpected status: ${response.status}` });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = {
  getRecipes,
  getRecipe,
};
