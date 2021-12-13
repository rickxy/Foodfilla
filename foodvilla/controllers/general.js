const express = require("express");
const router = express.Router();
const modelKits = require("../models/node");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");

const userModel = require("../models/user");
const sgMail = require("@sendgrid/mail");



// Set up a route to our homepage (default route).
router.get("/", (req, res) => {
    res.render("form/index", {
        allKits: modelKits.getTopMeals()
    });
});

router.get('/test', function(req, res, next) {
      
    userData.find((err, docs) => {
        if (!err) {
            res.render("list", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
 
});



router.get("/menu", (req, res) => {
    res.render("form/menu", {
        allKits: modelKits.getAllKits()
    });
});

router.get("/signup", function (req, res) {
    if (!res.locals.user)
        res.render("form/register");
    else res.redirect("/");
});

router.post("/signup", (req, res) => {


    const { firstName, lastName, email, password } = req.body;

    let passed = true;
    let validation = {};

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    let pr = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    if (typeof firstName !== 'string' || firstName.trim().length === 0) {
        passed = false;
        validation.firstName = "You must enter your first name."
    }

    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        passed = false;
        validation.lastName = "You must enter your last name."
    }

    if (typeof email !== 'string' || email.trim().length === 0) {
        passed = false;
        validation.email = "You must enter your email address.";

    }
    else if (!pattern.test(email)) {
        passed = false;
        validation.email = "Enter a valid email!";
    }

    if (typeof password !== 'string' || password.trim().length === 0) {
        passed = false;
        validation.password = "You must create your password";

    }
    else if (!pr.test(password)) {
        passed = false;
        validation.password = "Enter a password that have a number, alteast one lower and upper case letter, a sysmbol and have lenght 6 to 12.";
    }


    if (passed) {

        sgMail.setApiKey(process.env.SG_AIP_KEY);
        validation = {};

        const msg = {
            to: `${email}`,
            from: 'dpatoliya1@myseneca.ca',
            subject: 'Sing Up',
            html:
                `
                
                  Hello ${firstName} ${lastName}<br>

                  My name is Devanshi Patoliya, Thanks for joing with foodvilla.ca <br>

                  you can explore our wide range of food service<br>

                  Regards,<br>
                  Devanshi patoliya
                
                `
        };

        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,

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


router.get("/login", function (req, res) {
    if (!res.locals.user)
        res.render("form/login");
    else res.redirect("/");
});

router.post("/login", (req, res) => {

    // console.log(req.body);

    const { email, password, customer, clerk } = req.body;

    let condition = true;
    let valid = {};

    // This if statement check for null value and through error message if have any.
    if (typeof email != 'string' || email.trim().length == 0) {
        condition = false;
        valid.email = "Enter a Valid mail ID";

    }
    // This if statement check for null value and through error message if have any.
    if (typeof password != 'string' || password.trim().length == 0) {
        condition = false;
        valid.password = "You must enter your password."
    }
    if (!(clerk || customer)) {
        valid.checkbox = "Please select at least one";
        condition = false;
    }
    else if (clerk && customer) {
        valid.checkbox = "You cannot be both";
        condition = false;
    }
    condition =  true;
    console.log(condition);
    if(condition){
        let errors = [];
        userModel.findOne({
            email: req.body.email
        })
        .then(user=> {
            
                if (user) {
                    bcrypt.compare(password, user.password)
                        .then(isMatched => {
                            if (isMatched && customer) {
                                req.session.customeruser = user;
                                res.redirect("/dashboard/customer");
                            }
                            else if (isMatched && clerk) {

                                req.session.clerkuser = user;
                                res.redirect("/dashboard/clerk");
                            }
                            else {
                                // Passwords to not match.
                                console.log("Passwords do not match.");
                                valid.password = "Sorry, your password does not match our database.";
                                res.render("form/login", {
                                    valid,
                                    value: req.body
                                });
                            }

                        })
                        .catch(err => {
                            console.log(`Unable to compare passwords ... ${err}`);
                            errors.push("Oops, something went wrong.");

                            res.render("form/login", {
                                valid,
                                value: req.body,
                                errors
                            });
                        });

                }
                else {
                    console.log("User not found in the database.");
                    errors.push("Email not found in the database.");

                    res.render("form/login", {
                        valid,
                        value: req.body,
                        
                    });
                }
            })
            .catch(err => {
                // Couldn't query the database.
                console.log(`Error finding the user in the database ... ${err}`);
                errors.push("Oops, something went wrong.");

                res.render("form/login", {
                    valid,
                    value: req.body
                });
            });

    }
    else {
        res.render("form/login", {
            title: "login page",
            val: req.body,
            valid
        });
    }
});


 // viewing the Meal Descriptions

 router.get("/details/:Title", (req, res) => {
    res.render("form/details", {
        allKits: modelKits.getTopMeals()
    });
});


module.exports = router;

