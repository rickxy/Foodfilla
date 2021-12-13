const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealsSchema = new Schema({
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

const Meals = mongoose.model('meals',mealsSchema);
module.exports = Meals;



// var mongoose = require('mongoose');


// var  topmealSchema = new mongoose.Schema({
//   Title:  String,

//   Description: String,
  
//   Price:  String,
  
//   TopMeal:Boolean,
   
//   Time:  String,
   
//   Image: String,
   
// })
// // module.exports = mongoose.model('topmeal', topmealSchema)
// topMeals=mongoose.model('topmeal',topmealSchema);


// module.exports={
     
//     fetchData:function(callback){
//        var userData=topMeals.find({});
//        userData.exec(function(err, data){
//            if(err) throw err;
//            return callback(data);
//        })
       
//     }
// }
const myKits = [
    {
        mealCategory : "Specials of FOODVILLA",
        mealKits : [
            {
                 Title : "Cheesy Dosa",
                 Description : "potato mash with onions and ginger, cheese.”",
                 Price : "$13.99",
                 TopMeal : false,
                 Time : "in 15 min",
                 Image : "/static/img/Cheesydosa.jpg"
            },
            {
                Title : "Full Thali",
                Description : " includes 15 items: having 6 types of veggies, puri, chapatis, buttermilk, 4 types of sweet, dal and rice.",
                Price : "$20.60",
                TopMeal : true,
                Time : "in 35 min",
                Image : "/static/img/Fullthali.jpg"
            },
            {
                Title : "Gol Gappa",
                Description : "puris, potato mash with tomatoes, onion and sprout, spicy and sour water",
                Price : "$8.50",
                TopMeal : false,
                Time : "in 5 min",
                Image : "/static/img/Panipuri.jpg"
            },
            {
                Title : "Pizza Fries",
                Description : "fries, mayonese and pizza sauces, cheese, olives, jalapenos.",
                Price : "$14.99",
                TopMeal : false,
                Time : "in 15 min",
                Image : "/static/img/PizzaFries.jpg"
            },
        ]
    },
    {
        mealCategory : "Must Try Meals",
        mealKits : [
            {
                Title : "Sizzler",
                Description : "french-fries, noodles, potato tikis, cauliflower, cabbage, broccoli, cheese, spring onions, capsicum.",
                Price : "$20.50",
                TopMeal : false,
                Time : "in 30 min",
                Image : "/static/img/Sizzler.jpg"
            },
            {
                Title : "Steamed Momos",
                Description : "Shezwan sauce, cabbage and potato mash filled inside rice flour.",
                Price : "$10.80",
                TopMeal : false,
                Time : "in 12 min",
                Image :"/static/img/Steamedmomos.jpg"
            },
            {
                Title : "Paneer Tikka",
                Description : "paneer, onions, 3 types of capsicum, lemon, green chutney, carrot, potato.",
                Price : "$13.70",
                TopMeal : true,
                Time : "in 10 min",
                Image :"/static/img/paneertika.jpg"
            },
            {
                Title : "Manchurian",
                Description : "cabbage and potato balls, cabbages, spring onion, dry balls, coriander, onions, capsicums.",
                Price : "$16.40",
                TopMeal : true,
                Time : "in 20 min",
                Image : "/static/img/manchurian.jpg"
            },
        ]
    },
    {
    mealCategory : "Juices",
        mealKits : [
            {
                Title : "Orange mint",
                Description : "orange pulp extract with the essence of mint flavour in it.",
                Price : "$5.50",
                TopMeal : false,
                Time : "in 5 min",
                Image : "/static/img/orangemint.jpg"
            },
            {
                Title : "Blueberry cocktail",
                Description : "blueberry juice with the mis of sprite in it giving an exclusive flavour of juice plus cocktail.",
                Price : "$6.40",
                TopMeal : false,
                Time : "in 5 min",
                Image : "/static/img/Blueberrycocktail.jpg"
            },
            {
                Title : "Sprints",
                Description : "an exotic juice with the essence of fruits. Flavours of watermelon, lemon, apple, and orange available.",
                Price : "$7.0",
                TopMeal : false,
                Time : "in 5 min",
                Image : "/static/img/sprints.jpg"
            },
            {
                Title : "Marson Jar",
                Description : "chocolaty flavour milkshake with the pieces of KitKat inside it.",
                Price : "$10.30",
                TopMeal : false,
                Time : "in 10 min",
                Image : "/static/img/marsonjar.jpg"
            },
        ]
    }
];

module.exports.getAllKits = function(){
    return myKits;
};

module.exports.getTopMeals = function(){
    var Meals=[];
   for(var i=0;i<myKits.length;i++){
       for(var j=0;j<myKits[i].mealKits.length;j++){
           if(myKits[i].mealKits[j].TopMeal){
              Meals.push(myKits[i].mealKits[j]);
           }
       }
   }
   return Meals;
}


