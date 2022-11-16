import { errorHandler } from "../errors/errorsHandler.js";
import jwt from "../utils/jwt.js";

// Token 
export default (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return next(new errorHandler("Required token", 500));
    }
    
    jwt.verify(token)

    return next();
  } catch (error) {
    return next(new errorHandler("The token is invalid", 500));
  }
};
