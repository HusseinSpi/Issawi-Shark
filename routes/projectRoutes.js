const express = require("express");
const authController = require("../controllers/authController");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", projectController.getAllProjects);
router.post("/", projectController.createProject);

module.exports = router;