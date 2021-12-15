const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  mealKitsSchema = new Schema({
   
	Title: {
		type: String,
		required: true
	},
    Description: {
		type: String,
		required: true
	},
    Price: {
		type: String,
		required: true
	},
    TopMeal: {
		type: Boolean,
		required: true
	},
	Time:  {
		type: String,
		required: true
	},
    Image:  {
		type: String,
		required: true
	}

},{ timestamps: true});

const  MealKits = mongoose.model(' mealKits',  mealKitsSchema);
module.exports =  MealKits;
