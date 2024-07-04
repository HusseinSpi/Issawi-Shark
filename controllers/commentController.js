const Comment = require("../models/commentModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);
  res.status(201).json({
    status: "success",
    data: newComment,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedComment) {
    return next(new AppError("No comment found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: updatedComment,
  });
});

exports.likeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError("No comment found with that ID", 404));
  }

  const userId = req.user.id;
  const likeIndex = comment.likes.indexOf(userId);

  if (likeIndex === -1) {
    comment.likes.push(userId);
  } else {
    comment.likes.splice(likeIndex, 1);
  }

  await comment.save();

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

exports.getAllCommentsForProject = catchAsync(async (projectId) => {
  const comments = await Comment.find({ project: projectId });
  console.log(comments);
  return comments;
});
