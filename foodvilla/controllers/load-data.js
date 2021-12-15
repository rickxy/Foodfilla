const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const modelKits =  require("../models/node");
const  MealKits = require('../models/node');

const app = require('express');



router.get('/meal-kits',(req,res)=>{
    if (res.locals.user)
        MealKits.find().lean()
        .then((result)=>{
        res.render('mealkits',{ mealKits: result});
        })
        .catch((err)=>{
            console.log(err);
        })
    else res.redirect("/");
});

// router.get("/update-meal", function (req, res) {
//     if (!res.locals.user)
//         res.render("form/update_meal");
//     else res.redirect("/");
// });

router.get('/update-meal/:_id', async (req, res) => {
    const Mealkit = await MealKits.findById(req.params._id).lean()
    res.render('form/update_meal', { Mealkit: Mealkit })
  })

router.get("/addtopmeal", function (req, res) {
    if (res.locals.user)
        res.render("form/addtopmeal");
    else res.redirect("/");
});

router.delete('/delete/:_id', async (req, res) => {
    await MealKits.findByIdAndDelete(req.params._id)
    res.redirect('/')
  })

//mongoose and mongodb sandbox routes
router.get('/add-meal',(req, res)=>{
  
	const mealKits = new  MealKits({
		Title: 'new meal',
		Description: 'About my new meal',
		Price: '30.50',
        TopMeal: 'false',
        Time: 'more about my blog',
        Image: 'image/1.jpg'
	});
    mealKits.save().then((result) => {
		res.send(result);
	}).catch((err) =>{
		console.log(err);
	})

})


//mongoose and mongodb sandbox routes
router.post('/add-meal',(req, res)=>{
  
	const mealKits = new  MealKits({
		Title: 'new meal',
		Description: 'About my new meal',
		Price: '30.50',
        TopMeal: 'false',
        Time: 'more about my blog',
        Image: 'image/1.jpg'
	});
    if (!res.locals.user)
        mealKits.save().then((result) => {
            res.send(result);
        }).catch((err) =>{
            console.log(err);
        })
    else res.redirect("/");
   

})

router.get("/addmenu", function (req, res) {
    if (res.locals.user)
        res.render("form/addmenu");
    else res.redirect("/");
});

router.get("/delete", function (req, res) {
    if (!res.locals.user)
        res.render("form/addmenu");
    else res.redirect("/");
});


router.post("/ad", (req, res) => {


    const { Title, Description, Price, TopMeal, Image } = req.body;

    let passed = true;
    let validation = {};

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    let pr = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    if (typeof Title !== 'string' || Title.trim().length === 0) {
        passed = false;
        validation.firstName = "The Title name is Taken."
    }

    if (typeof Description !== 'string' || Description.trim().length === 0) {
        passed = false;
        validation.lastName = "Add Description."
    }

    if (typeof Price !== 'string' || Price.trim().length === 0) {
        passed = false;
        validation.email = "Add Price.";

    }
  
    if (typeof TopMeal !== 'string' || TopMeal.trim().length === 0) {
        passed = false;
        validation.password = "True or False";

    }
    if (typeof Image !== 'string' || Image.trim().length === 0) {
        passed = false;
        validation.password = "True or False";

    }
  
    if (passed) {

        sgMail.setApiKey(process.env.SG_AIP_KEY);
        validation = {};

      

        const user = new userModel({
            Title: req.body.Title,
            Description: req.body. Description,
            Price: req.body.Price,
            TopMeal: req.body.TopMeal,
            Image: req.body.Image,

        });

        user.save()
            .then((userSaved) => {
                // User was saved correctly.
                console.log(`User ${userSaved.firstName} has been added to the database.`);


                sgMail.send(msg)
                    .then(() => {
                        res.render("form/welcomePage", {
                            title: "sign up page",
                            values: req.body,
                            validation
                        });
                    })
                    .catch(err => {
                        console.log(`Error ${err}`);

                        res.render("form/register", {
                            title: "sign up page",
                            values: req.body,
                            validation
                        });
                    });
            })
            .catch((err) => {
                userModel.findOne({
                    email: email
                })
                    .then(user => {
                        if (user) {
                            validation.email = "Email already exists, Please try different..";
                            res.render("form/register", {
                                validation,
                                value: req.body
                            });
                        }
                    });
                console.log(`Error adding user to the database ... ${err}`);
            });

    }
    else {
        res.render("form/register", {
            title: "sign up page",
            values: req.body,
            validation
        });
    }


});



 //Exporting router
 module.exports = router;