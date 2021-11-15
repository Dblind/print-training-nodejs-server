import jwt from 'jsonwebtoken';
import { secret } from '../API/SERVER_API/config_jwt.js';

const authMiddleware = (request, response, next) => {
  if (request.method === "OPTIONS") next();

  try {
    // const token = request.headers.authorization.split(" ")[1];
    // console.log(request.cookies.jwtToken);
    const token = request.cookies?.jwtToken?.split(" ")[1];
    if (!token) { throw new Error("Don't have cookies token.")}

    const decodedData = jwt.verify(token, secret.secret);
    request.tokenData = decodedData;
    next();
  } catch (error) {
    // console.log(error);
    response.status(403).json({ message: "User not authorized.", errors: { token: error.message, } });
  }
}

export default authMiddleware;