const tryCatch = require("../../utils/tryCatch");
const client = require("../../db");
const CustomError = require("../../utils/customError");
const { updateTodoSchema, todoIdSchema } = require("../../schema/todoSchemas");

const updateTodo = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, iscomplete } = req.body;
  const { success } = todoIdSchema.safeParse(+id);
  if (!success) {
    throw new CustomError("Id should be a number and is required", 403);
  }
  const { success: updateSuccess } = updateTodoSchema.safeParse({
    title,
    description,
    iscomplete,
  });
  if (!updateSuccess) {
    throw new CustomError(
      "Title and description must be strings and iscomplete should be a boolean",
      403
    );
  }
  const query = `
    UPDATE todos
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      iscomplete = COALESCE($3, iscomplete),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;
  const values = [title, description, iscomplete, id];
  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    throw new CustomError("Todo with given id does not exist", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: result.rows[0],
    },
  });
});

module.exports = updateTodo;
