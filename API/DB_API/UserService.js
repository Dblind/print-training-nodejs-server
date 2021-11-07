import User from '../../schemes/User.js';

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async update(user) {
    if (!user._id) { throw new Error("id not specified."); }
    const updatedUser = User.findByIdAndUpdate(user._id, user, { new: true, });
    return updatedUser;
  }

  async delete(id) {
    if (!id) { throw new Error("id not specified."); }
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default new UserService;