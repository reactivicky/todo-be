const express = require("express");
const {
  getAllTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers");

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodo).delete(deleteTodo).patch(updateTodo);

module.exports = router;
