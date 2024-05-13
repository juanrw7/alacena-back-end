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
  label: String,
  url: String,
  image: String,
  calories: Number,
  uri: String,
  reviews: [reviewSchema]
},{
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export { Recipe }