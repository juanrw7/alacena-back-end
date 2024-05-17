import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as recipesCtrl from "../controllers/recipes.js"

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:recipeId', checkAuth, recipesCtrl.show)
router.put('/:recipeId/reviews', checkAuth, recipesCtrl.updateReview)
router.post('/', checkAuth, recipesCtrl.index)
router.post('/new', checkAuth, recipesCtrl.create)
router.post('/:recipeId/reviews', checkAuth, recipesCtrl.createReview)
router.post('/recipedetails', checkAuth, recipesCtrl.showRecipe)
router.delete('/:recipeId/reviews/:reviewId', checkAuth, recipesCtrl.deleteReview)
router.post('/search', checkAuth, recipesCtrl.searchIngredient)

export { router }