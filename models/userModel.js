const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { parseInt } = require("lodash");

const userSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "A password must have more or equal then 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password confirmation"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["user", "investor", "admin"],
    default: "user",
  },
  about: {
    type: String,
    trim: true,
    default: "Hello, I use Issawi-Shark",
  },
  age: {
    type: Number,
    min: [18, "Users must be at least 18 years old"],
    max: [99, "Users must be at most 99 years old"],
    required: true,
  },
  github: {
    type: String,
    match: /https?:\/\/(www\.)?github\.com\/\S+/,
    trim: true,
    required: true,
  },
  facebook: {
    type: String,
    match: /https?:\/\/(www\.)?facebook\.com\/\S+/,
    trim: true,
  },
  twitter: {
    type: String,
    match: /https?:\/\/(www\.)?x\.com\/\S+/,
    trim: true,
  },
  linkedin: {
    type: String,
    match: /https?:\/\/(www\.)?linkedin\.com\/in\/\S+/,
    trim: true,
  },
  instagram: {
    type: String,
    match: /https?:\/\/(www\.)?instagram\.com\/\S+/,
    trim: true,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
