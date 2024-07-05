const express = require("express");
const projectController = require("../controllers/projectController");
const upload = require("../utils/multerConfig");

const router = express.Router();

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(upload.array("images", 10), projectController.createProject);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(projectController.updateProject);

router.route("/:id/rating").patch(projectController.updateProjectRating);

module.exports = router;
