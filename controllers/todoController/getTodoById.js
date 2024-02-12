const tryCatch = require("../../utils/tryCatch");
const client = require("../../db");
const CustomError = require("../../utils/customError");
const { todoIdSchema } = require("../../schema/todoSchemas");

const getTodo = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { success } = todoIdSchema.safeParse(+id);
  if (!success) {
    throw new CustomError("Id should be a number and is required", 403);
  }
  const query = `SELECT * FROM todos WHERE id = $1;`;
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

module.exports = getTodo;
