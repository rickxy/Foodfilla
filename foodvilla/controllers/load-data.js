const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const modelKits =  require("../models/node");
const  MealKits = require('../models/node');

const app = require('express');



router.get('/meal-kits',(req,res)=>{
    MealKits.find().lean()
	.then((result)=>{
     res.render('mealkits',{ mealKits: result});
	})
	.catch((err)=>{
		console.log(err);
})
});



router.get("/addtopmeal", function (req, res) {
    if (!res.locals.user)
        res.render("form/addtopmeal");
    else res.redirect("/");
});

//mongoose and mongodb sandbox routes
router.get('/add-meal',(req, res)=>{
	const mealKits = new  MealKits({
		Title: 'new blog',
		Description: 'about my new blog',
		Price: 'more about my blog',
        TopMeal: 'false',
        Time: 'more about my blog',
        Image: 'more about my blog'
	});
    mealKits.save().then((result) => {
		res.send(result);
	}).catch((err) =>{
		console.log(err);
	})

})

router.get("/addmenu", function (req, res) {
    if (!res.locals.user)
        res.render("form/addmenu");
    else res.redirect("/");
});




 //Exporting router
 module.exports = router;