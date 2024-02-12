const { z } = require("zod");
const tryCatch = require("../utils/tryCatch");
const client = require("../db");
const CustomError = require("../utils/customError");

const getAllTodos = tryCatch(async (req, res) => {
  const todos = await client.query(
    "SELECT * FROM todos ORDER BY updated_at DESC"
  );
  res.status(200).json({
    status: "sucess",
    data: {
      todos: todos.rows,
      count: todos.rowCount,
    },
  });
});

const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const createTodo = tryCatch(async (req, res) => {
  const { title, description } = req.body;
  const { success } = todoSchema.safeParse({ title, description });
  if (!success) {
    throw new CustomError(
      "Title and description should be strings and title is required",
      403
    );
  }

  // Use parameterized queries to prevent SQL injection
  const query = `
  INSERT INTO todos (title, description, isComplete, created_at, updated_at)
  VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  RETURNING *;
`;
  // Set an empty string if description is null or undefined
  const values = [title, description || "", false];
  const result = await client.query(query, values);

  res.status(201).json({
    status: "success",
    data: {
      todo: result.rows[0],
    },
  });
});

const todoIdSchema = z.number().positive().int();

const getTodo = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { success } = todoIdSchema.safeParse(+id);
  if (!success) {
    throw new CustomError("Id should be a number and is required", 403);
  }
  const query = `SELECT * FROM todos WHERE id = $1`;
  const values = [id];
  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    throw new CustomError("No todo with given id", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: result.rows[0],
    },
  });
});

const deleteTodo = () => {};

const updateTodo = () => {};

module.exports = { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo };
