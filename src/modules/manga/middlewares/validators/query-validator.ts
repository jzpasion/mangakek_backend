import { query } from "express-validator";
import { formValidatorMiddleware } from "../../../../common/helper";

export const ListValidationPipeline = {
  pipeline: [
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
    query("excludedTags")
      .optional()
      .isArray()
      .trim()
      .withMessage("must be a array of string."),
    query("translatedLanguage")
      .optional()
      .isArray()
      .trim()
      .withMessage("must be a array of string."),
    query("order")
      .optional()
      .isObject()
      .trim()
      .withMessage("must be a object of string."),
  ],
  validator: formValidatorMiddleware,
};
