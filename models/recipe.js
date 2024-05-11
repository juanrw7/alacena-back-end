import mongoose from 'mongoose'

const Schema = mongoose.Schema
  
const reviewSchema = new Schema({
  comment: {
    type: String, 
    required: true
  },
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  }
})

const recipeSchema = new Schema({
  name: String,
  mealType: {
    type: String,
    enum:['Breakfast', 'Lunch', 'Dinner', 'Snack']
  },
  ingredients: {
    food: String,
    foodCategory: String,
  },
  cuisineType: {
    type: String,
    default: American,
    enum:['American' , 'Asian', 'British', 'Carribbean', 'Central Europe', 'Chinese',  'Eastern Europe', 'French', 'Indian',  'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian'], 
},
  instructions: String,
  image: String,
  calories: Number,
  random: Boolean,
  reviews: [reviewSchema]
},{
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export { Recipe }