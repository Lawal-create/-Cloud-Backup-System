import { NextFunction, Request, Response } from "express";
import { UserAttributes } from "../../models/User";
import { role } from "../../types/global";
import ApiError from "../../errorHandler/ApiError";

export const requiresAdmin = (
  type: role | role[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //extract user data gotten from requiresSignIn middleware
      const user: UserAttributes = req.body.user || res.locals.user;

      if (user) {
        //check if user type matches type/types specified
        let isUser;
        if (typeof type === "string") isUser = user.role === type;
        else isUser = type.includes(user.role);

        if (!isUser) return next(new ApiError(403, "Access denied"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requiresAdmin;
