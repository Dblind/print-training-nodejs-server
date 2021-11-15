import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserService from "../DB_API/UserService.js";
import { secret } from "./config_jwt.js";


class UserController {
  async create(request, response) {
    try {
      const errors = validationResult(request);
      // if (!errors.isEmpty()) return response.status(400).json(errors);

      const createdUser = await UserService.create(request.body);
      // response.header({'Access-Control-Allow-Origin': 'http://localhost:3001'});
      // response.setHeader({'Access-Control-Allow-Origin': 'http://localhost:3001'});
      //      response.header('Access-Control-Allow-Methods', 'GET');
      response.json(createdUser);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
  
  async login(request, response) {
    try {
      console.log("Login User", request.body);
      const userData = await UserService.login(request.body);
      console.log(userData);
//        response.header("withCredentials", true);
//        response.header("sameSite", "none");
//        response.header("secure", true);
      response.cookie("jwtToken", "Bearer " + userData.jwtToken, {
//        domain: '127.0.1.100',
//        httpOnly: true,
        maxAge: 30000, //30 * 24 * 60 * 60 * 1000,
        sameSite: "none", secure: true, 
      })
      response.json({ ...userData.user });
    } catch (error) {
      console.log("error login user");
      response.status(500).json(error.message);
    }
  }

  async logout(request, response) {
    try {
      response.clearCookie("jwtToken");
      response.json({ message: "", });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async getProfile(request, response) {
    try {
      // const token = request.headers.authorization.split(" ")[1];
      // if (!token) { throw new Error("Old token"); }
      const user = await UserService.getProfile(request.tokenData._id);
      response.json(user);
    } catch (error) {
      console.log("getProfile error", error.message)
      response.status(403).json(error.message);
    }
  }

  async setTexts(request, response) {
    try {
      await UserService.setTexts(request.tokenData._id, request.body.texts);
      response.status(200).json({ success: true, });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async getTexts(request, response) {
    try {
      const { _id, } = request.tokenData;
      const texts = await UserService.getTexts(_id);
      response.json( texts, );
    } catch (error) {
      response.status(500).json(error.toString());
    }
  }

  async getAll(request, response) {
    try {
      const users = await UserService.getAll();
      response.json(users);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const updatedUser = await UserService.update(request.body);
      response.json(updatedUser);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  async delete(request, response) {
    try {
        console.log(request.body);
      const deletedUser = await UserService.delete(request.params.id);
      response.json(deletedUser);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
}


export default new UserController();
