const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { organizationSchema } = require("./organization");
const { ObjectId } = require("mongodb");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
      minlength: 7,
      trim: true,
      required: true,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Please try a different password!");
        } else if (value.length < 8) {
          throw new Error("Password must contain at least 8 characters");
        } else if (!(value.includes("!") || value.includes("@") || value.includes("*"))) {
          throw new Error("Password must contain at least one special character (!,@,*)");
        }
      },
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    profilePhoto: {
      type: Buffer,
      required: false,
    },
    organizations: {
      type: [organizationSchema],
    },
    tokens: new Array({
      token: {
        type: String,
        required: true,
      },
    }),
  },
  {
    timestamps: true,
  }
);

/**
 * Middleware function for password security
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

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
  user.tokens = user.tokens.concat({ generatedToken });
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
  console.log(user);
  console.log(await bcrypt.hash(password, 8));
  if (!user) {
    throw new Error("You can not login. Try again");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("You can not login. Try again");
  }

  return user;
};

//Hash the plain text password before saving the model
userSchema.pre("save", async function (next) {
  const user = this;

  //true when user is created and also true when the field is modified
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
