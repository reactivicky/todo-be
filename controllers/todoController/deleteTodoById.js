const tryCatch = require("../../utils/tryCatch");
const client = require("../../db");
const CustomError = require("../../utils/customError");
const { todoIdSchema } = require("../../schema/todoSchemas");

const deleteTodo = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { success } = todoIdSchema.safeParse(+id);
  if (!success) {
    throw new CustomError("Id should be a number and is required", 403);
  }
  const query = `DELETE FROM TODOS WHERE id = $1 RETURNING *;`;
  const values = [id];
  const result = await client.query(query, values);

  if (result.rows.length === 0) {
    throw new CustomError("Todo with given id does not exist", 404);
  }

  res.sendStatus(204);
});

module.exports = deleteTodo;
