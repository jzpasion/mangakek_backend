import { validationResult } from "express-validator";
import * as HttpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

export const formValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: any = validationResult(req);
  if (result.errors.length !== 0) {
    return res.status(HttpStatus.BAD_REQUEST).json(result);
  }
  next();
};

export const generateQueryString = (
  queryString: string,
  queryData: any,
  fieldName?: string
) => {
  const x = 0;

  for (const query in queryData) {
    console.log("query string value", queryString);
    const andSign = queryString ? "&" : "?";
    // check if fieldName is not empty, if not, add query inside of the '[]' eg: filterBy[value] = testValue
    const queryField = fieldName ? `${fieldName}[${query}]` : query;
    try {
      // console.log('queryData[query]: ', queryData[query])
      // check if the value is object

      if (typeof queryData[query] === "object") {
        // recursion call
        queryString = generateQueryString(queryString, queryData[query], query);
      } else {
        queryString = queryString
          .concat(andSign)
          .concat(`${queryField}=${queryData[query]}`);
      }
    } catch (err) {
      queryString = queryString
        .concat(andSign)
        .concat(`${queryField}=${queryData[query]}`);
    }
  }
  return queryString;
};
