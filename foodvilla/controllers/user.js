const express = require('express');
const router = express.Router();
const modelKits =  require("../models/node");

router.get("/customer", function(req,res){
    if(req.session.customeruser)
     res.render("user/customer");
    else
     res.redirect("/logout");
  });
router.get("/clerk", function(req,res){
    if(req.session.clerkuser)
     res.render("user/clerk",{
        // allKits : modelKits.allKits,
     });
    else
     res.redirect("/logout");
});

router.get("/dashboard", function(req,res){
    if(req.session.clerkuser)
    res.redirect("/clerk");
    else
    res.redirect("/customer");  
});

router.get("/logout", (req, res) => {
    req.session.destroy();

    res.redirect("/login");
});

 //Exporting router
 module.exports = router;