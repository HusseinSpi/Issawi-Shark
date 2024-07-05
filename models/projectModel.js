const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [
        100,
        "A project description must have more or equal to 100 characters",
      ],
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "A project must have at least 1 category",
      },
      enum: {
        values: ["Hitech", "Banking", "Healthcare", "Educational"],
        message:
          "Categories must be one of [Hitech, Banking, Healthcare, Educational]",
      },
    },
    github: {
      type: String,
      required: true,
      match: /https?:\/\/(www\.)?github\.com\/\S+/,
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    technologies: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamMembers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select:
      "userName photo email role instagram linkedin twitter facebook github",
  }).populate({
    path: "teamMembers",
    select: "userName photo email role",
  });
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
