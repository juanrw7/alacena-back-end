import { Profile } from "../models/profile.js"
import { Recipe } from "../models/recipe.js"
import axios from "axios"

async function index (req, res) {
  try {
    const result = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&mealType=${req.body.mealType}&random=true`)

    res.json(result.data.hits)
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
  }
}

async function createReview (req, res) {
  try {
    req.body.author = req.user.profile
    const recipe = await Recipe.findById(req.params.recipeId)
    recipe.reviews.push(req.body)
    await blog.save()
    const newReview = recipe.reviews.at(-1)
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile
    res.status(201).json(newReview)
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
  }
}

async function updateReview (req, res) {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    const review = recipe.reviews.id(req.body._id)
    review.comment = req.body.comment
    review.rating = req.body.rating
    await recipe.save()
    res.status(200).json(recipe)
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
  }
}

async function deleteReview (req, res) {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    recipe.reviews.remove({_id: req.params.reviewId})
    await recipe.save()
    res.status(200).json(recipe)  
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
    }
  }
  
async function create (req, res) {
  req.body.reviewData.author = req.user.profile
  const recipe = await Recipe.findOne({uri:req.body.recipeData.uri})
    .populate("reviews.author")
  try {
    if (recipe) {
      recipe.reviews.push(req.body.reviewData)
      await recipe.save()
      const newReview = recipe.reviews.at(-1)
      const profile = await Profile.findById(req.user.profile)
      newReview.author = profile
      res.status(201).json(recipe)
    } else {
      const newRecipe = await Recipe.create(req.body.recipeData)
      newRecipe.reviews.push(req.body.reviewData)
      await newRecipe.save()
      const newReview = newRecipe.reviews.at(-1)
      const profile = await Profile.findById(req.user.profile)
      newReview.author = profile
      res.status(201).json(newRecipe)
    }
  } catch (error) {
  console.log(error)
  res.status(500).json(error)
  }
}

async function showRecipe (req, res){
  const recipe = await Recipe.findOne({uri:req.body.uri})
    .populate("reviews.author")
  try {
    if (recipe) {
      res.status(201).json(recipe)
    } else {
      res.status(201).json(req.body)
    }
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
  }
}

async function searchIngredient(req, res) {
  try {
    const result = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.ingredient1}%2C%20${req.body.ingredient2}%2C%20${req.body.ingredient3}%2C%20${req.body.ingredient4}%2C%20${req.body.ingredient5}%2C%20${req.body.ingredient6}%2C%20${req.body.ingredient7}%2C%20${req.body.ingredient8}%2C%20${req.body.ingredient9}%2C%20${req.body.ingredient10}:&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
    
    res.json(result.data.hits)
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
}
}

export{
  index,
  createReview,
  updateReview,
  deleteReview,
  create,
  showRecipe,
  searchIngredient
}