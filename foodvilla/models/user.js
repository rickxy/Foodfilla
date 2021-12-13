const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", function(next) {
    let user = this;

    // Generate a unique salt.
    bcrypt.genSalt(10)
    .then(salt => {
        // Hash the password using the salt.
        bcrypt.hash(user.password, salt)
        .then(hashedPwd => {
            // Password was hashed.
            // Update the user model and save to the database.
            user.password = hashedPwd;
            next();
        })
        .catch(err => {
            console.log(`Error occurred when hashing ... ${err}`);    
        })
    })
    .catch(err => {
        console.log(`Error occurred when salting ... ${err}`);
    })
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
