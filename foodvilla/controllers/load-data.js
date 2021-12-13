const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const modelKits =  require("../models/node");


  router.get("/meal-kits", function (req, res) {
    if (!res.locals.user)
        res.render("form/addtopmeal");
    else res.redirect("/");
});

router.get("/addtopmeal", function (req, res) {
    if (!res.locals.user)
        res.render("form/addtopmeal");
    else res.redirect("/");
});

//mongoose and mongodb sandbox routes
app.get('/add-meal',(req,res)=>{
	const Meals = new Meals({
		Title: 'new blog',
		Description: 'about my new blog',
		Price: 'more about my blog',
        TopMeal: 'more about my blog',
        Time: 'more about my blog',
        Image: 'more about my blog'
	});
	meals.save().then((result) => {
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