import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { Roles } from "../type";
export const auth = (...roles:Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.ACCESS_TOKEN_SECRET_KEY as string,
      ) as JwtPayload;

      // console.log(decoded);
      const userData = await pool.query(
        `
      SELECT * FROM users WHERE email=$1  
    `,
        [decoded.email],
      );
      const user = userData.rows[0];
      // console.log(userData);
      if (userData.rows.length === 0) {
        sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "User not found",
        });
      }

      if (!user?.is_active) {
        sendResponse(res, {
          statusCode: 402,
          success: false,
          message: "Forbidden",
        });
      }
      req.user = decoded;

      //   if (roles.length && !roles.includes(user.role)) {
      //     res.status(403).json({
      //       success: false,
      //       message: "forbidden, who the hell r u bro? U should keep distance.",
      //     });
      //   }

      next();
    } catch (error) {
      next(error);
    }
  };
};
