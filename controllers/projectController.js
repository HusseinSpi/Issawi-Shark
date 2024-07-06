const Project = require("../models/projectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects,
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    categories,
    github,
    technologies,
    status,
    owner,
    teamMembers,
    contactInfo,
  } = req.body;

  const files = req.files;
  const imageUrls = files.map((file) => `/uploads/${file.filename}`);

  const newProject = await Project.create({
    title,
    description,
    categories,
    github,
    technologies,
    status,
    owner,
    teamMembers,
    contactInfo,
    images: imageUrls,
  });

  res.status(201).json({
    status: "success",
    data: newProject,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate({
    path: "user",
  });
  if (!project) {
    return next(new AppError("Project not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: project,
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedProject) {
    return next(new AppError("No project found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: updatedProject,
  });
});

exports.updateProjectRating = catchAsync(async (req, res, next) => {
  console.log("Project ID:", req.params.id);

  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError("No project found with that ID", 404));
  }
  console.log(project.rating);

  const comments = await Comment.find({ project: req.params.id });
  console.log(comments);

  if (!comments.length) {
    return next(new AppError("No comments found for this project", 404));
  }

  const totalRating = comments.reduce(
    (acc, comment) => acc + comment.rating,
    0
  );
  const averageRating = totalRating / comments.length;

  project.rating = averageRating;
  await project.save();

  res.status(200).json({
    status: "success",
    data: project,
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.id);
  if (!deletedProject) {
    return next(new AppError("No project found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
