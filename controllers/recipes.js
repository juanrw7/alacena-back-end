import { Recipe } from "../models/recipe.js"
import axios from "axios"

async function index (req, res) {
  try {
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&cuisineType=${req.body.cuisineType}&random=true`)
    .then(response => {
      res.json(response.data.hits)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
  index
}