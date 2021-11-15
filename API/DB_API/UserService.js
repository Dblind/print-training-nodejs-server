import Role from '../../schemes/Role.js';
import User from '../../schemes/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../SERVER_API/config_jwt.js'


class UserService {
  async create(user) {
    const { login, password } = user;
    const candidat = await User.findOne({ login });
    if (candidat) { throw new Error("This login already exist.") }

    const role = await Role.findOne({ value: "USER", });
    console.log("role", role);
    console.log("role.value", role.value);
    const hashPassword = bcrypt.hashSync(password, 5);
    const createdUser = await User.create({ login, password: hashPassword, roles: [role.value] });

    // const createdUser = await User.create(user);
    return createdUser;
  }

  async login(userData) {
    const { login, password, } = userData;
    const user = await User.findOne({ login });
    if (!user) error("have user");

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) error("not valid password");

    const jwtToken = generateAccessToken(user._id, user.roles, user.login,);
    console.log(jwtToken);
    return { jwtToken, user: { _id: user._id, login: user.login, avatar: `https://robohash.org/${user.login}.png` }, };

    // if (!userData) { throw new Error("login is not specified."); }
    // const user = await User.findOne({ login: userData, });
    // console.log(user);
    // return user;

    function error(obj) {
      throw new Error("Login user or password not found. " + obj);
    }
  }

  async getProfile(_id) {
    const user = await User.find({ _id }, { _id: false, login: true, texts: true, });
    console.log(user);
    return user;
  }

  async setTexts(_id, texts) {
    await User.updateOne({ _id, }, { $set: { texts: texts, } });
  }

  async getTexts(_id) {
    return await User.findOne({ _id, }, { _id: false, texts: true, } );
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async update(user) {
    if (!user._id) { throw new Error("id not specified. update."); }
    const updatedUser = User.findByIdAndUpdate(user._id, user, { new: true, });
    return updatedUser;
  }

  async delete(id) {
    if (!id) { throw new Error("id not specified. delete."); }
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

function generateAccessToken(id, roles, login) {
  const payload = { _id: id, roles, login, };
  return jwt.sign(payload, secret.secret, { expiresIn: "20s", });
}

export default new UserService;
