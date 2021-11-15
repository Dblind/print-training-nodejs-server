import jwt from 'jsonwebtoken';
import { secret } from '../API/SERVER_API/config_jwt.js';

const roleMiddleware = (roles) => {
  return (request, response, next) => {
    if (request.method === "OPTIONS") next();

    try {
      const token = request.headers.authorization.split(" ")[1];
      if (!token) response.status(403).json({ message: "User not authorized." });

      const {roles: userRoles, } = jwt.verify(token, secret.secret);
      let hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) { hasRole = true; }
      });
      if (!hasRole) {
        response.status(403).json("Your don't have access");
      }
      next();
    } catch (error) {
      console.log(error);
      response.status(403).json({ message: "User not authorized." });
    }
  }
}
export default roleMiddleware;