import { Profile } from "../models/profile.js"
import { Recipe } from "../models/recipe.js"
import axios from "axios"

async function index (req, res) {
  console.log(req.body.mealType)
  try {
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&mealType=${req.body.mealType}&random=true`)
    .then(response => {
      console.log(response.data.hits)
      res.json(response.data.hits)
    })
  } catch (error) {
    console.log(error)
      res.status(500).json(error)
  }
}

async function show (req, res){
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    .populate()
    res.status(200).json(recipe)
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
    const recipe = await Recipe.findById(req.params.blogId)
    const review = recipe.reviews.id(req.body._id)
    console.log(recipe)
    review.comment = req.body.comment
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
  console.log(req.body.reviewData.author)
  req.body.reviewData.author = req.user.profile
  const recipe = await Recipe.findOne({uri:req.body.recipeData.uri})
  try {
    if (recipe) {
      recipe.reviews.push(req.body.reviewData)
      await recipe.save()
      const newReview = recipe.reviews.at(-1)
      const profile = await Profile.findById(req.user.profile)
      newReview.author = profile
      console.log(profile)
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

export{
  index,
  show,
  createReview,
  updateReview,
  deleteReview,
  create,
}