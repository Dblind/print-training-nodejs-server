import UserService from "../DB_API/UserService.js";


class UserController {
  async create(request, response) {
    try {
      const createdUser = await UserService.create(request.body);
      response.json(createdUser);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async getAll(request, response) {
    try {
      const users = await UserService.getAll();
      response.json(users);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async update(request, response) {
    try {
      const updatedUser = UserService.update(request.body);
      response.json(updatedUser);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async delete(request, response) {
    try {
      const deletedUser = UserService.delete(request.body.id);
      response.json(deletedUser);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}


export default new UserController();