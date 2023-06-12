const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { phone } = require("phone");
const passwordValidator = require("password-validator");
const bcrypt = require("bcryptjs");

// Create a schema
const schema = new passwordValidator();
// Add properties to it
schema.is().min(8); // Minimum length 8
// .is()
// .max(40) // Maximum length 100
// .has()
// .uppercase() // Must have uppercase letters
// .has()
// .lowercase() // Must have lowercase letters
// .has()
// .digits(2) // Must have at least 2 digits
// .has()
// .not()
// .spaces() // Should not have spaces
// .is()
// .not()
// .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required!"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Wrong email format!");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required!"],
      validate(value) {
        if (this.isModified("password")) {
          if (!schema.validate(value)) {
            throw new Error("Please create a Stronger password!");
          }
        }
      },
    },
    telephone: {
      type: String,
      required: false,
      validate: function (value) {
        if (!phone(value, { validateMobilePrefix: false }).isValid) {
          throw new Error("Wrong telephone format!");
        }
      },
    },
    address: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    linkedinLink: {
      type: String,
      required: false,
    },
    tokens: new Array({
      token: {
        type: String,
        required: true,
      },
    }),
    organizations: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    }),
    organizationsData: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "data",
    }),
    files: new Array({
      type: mongoose.Schema.Types.ObjectId,
      refs: "File",
    }),
  },
  {
    timestamps: true,
  }
);

// Override .toJSON() method to hide private data
userSchema.methods.toJSON = function () {
  const user = this;

  // Create a clone of the original user obj
  const userObjPublic = user.toObject();

  // Hide private fields
  delete userObjPublic.password;
  delete userObjPublic.tokens;

  return userObjPublic;
};

/**
 * This is a method that generates a jwt token for a user when
 * he successfully logs into his account. The method doesn't have any parameters.
 * The "jsonwebtoken" package was used to implement the functionality
 * @returns {string} A jwt token in string format
 * @this {User} Reference to a User instance
 */
userSchema.methods.generateAuthenticationToken = async function () {
  const user = this;

  const generatedToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token: generatedToken });

  await user.save();

  return generatedToken;
};

/**
 * This is a static function that checks the credentials of user.
 * @param {username} username The username that the user puts in the field.
 * @param {password} password The password that the user puts in the field.
 * @returns {user} A user instance is returned.
 */
userSchema.statics.checkCredentials = async function (username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Wrong username or password, please try again!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Wrong username or password, please try again!");
  }

  return user;
};

/**
 * Middleware function for password security
 */
userSchema.pre("save", async function (next) {
  const user = this;

  //true when user is created and also true when the field is modified
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Code for custom error handling for duplicated and missing values
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`${Object.keys(error.keyValue)[0]} is already in use!`));
  } else if (error.name === "ValidationError") {
    validationErrors = Object.values(error.errors).map((val) => val.message);
    if (validationErrors[0]) {
      next(new Error(validationErrors[0]));
    }
  } else {
    next(error);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
