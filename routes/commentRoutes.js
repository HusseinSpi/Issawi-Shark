const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", commentController.getAllComments);
router.post("/", authController.protect, commentController.createComment);
router.put("/:id", authController.protect, commentController.updateComment);
router.put("/:id/like", authController.protect, commentController.likeComment);
router.delete("/:id", authController.protect, commentController.deleteComment);

module.exports = router;
