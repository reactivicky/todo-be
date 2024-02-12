const { z } = require("zod");

const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const todoIdSchema = z.number().positive().int();

const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  iscomplete: z.boolean().optional(),
});

module.exports = { todoSchema, todoIdSchema, updateTodoSchema };
