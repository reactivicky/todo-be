const getAllTodos = require("./todoController/getAllTodos");
const createTodo = require("./todoController/createTodo");
const getTodo = require("./todoController/getTodoById");
const deleteTodo = require("./todoController/deleteTodoById");
const updateTodo = require("./todoController/updateTodoById");

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
