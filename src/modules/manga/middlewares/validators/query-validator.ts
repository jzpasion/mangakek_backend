import { query } from "express-validator";

export const ListValidationPipeline = [
  query("limit")
    .optional()
    .isNumeric()
    .withMessage("must be a number.")
    .trim()
    .escape(),
  query("offset")
    .optional()
    .isNumeric()
    .withMessage("must be a number.")
    .trim()
    .escape(),
];
