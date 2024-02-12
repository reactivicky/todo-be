const tryCatch = require("../../utils/tryCatch");
const client = require("../../db");

const getAllTodos = tryCatch(async (req, res) => {
  const todos = await client.query(
    "SELECT * FROM todos ORDER BY updated_at DESC;"
  );
  res.status(200).json({
    status: "sucess",
    data: {
      todos: todos.rows,
      count: todos.rowCount,
    },
  });
});

module.exports = getAllTodos;
