const tryCatch = require("../../utils/tryCatch");
const client = require("../../db");
const CustomError = require("../../utils/customError");
const { todoSchema } = require("../../schema/todoSchemas");

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
  INSERT INTO todos (title, description, iscomplete, created_at, updated_at)
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

module.exports = createTodo;
