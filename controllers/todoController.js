const tryCatch = require("../utils/tryCatch");

const getAllTodos = tryCatch(async (req, res) => {
  res.status(200).json({
    status: "sucess",
    data: "todos",
  });
});

const createTodo = () => {};

const getTodo = () => {};

const deleteTodo = () => {};

const updateTodo = () => {};

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
