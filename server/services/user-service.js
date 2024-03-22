import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async registration(data) {
    const errors = validationResult(data);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.toString(), salt);

    const doc = new UserModel({ ...data, passwordHash: hash });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

    const { passwordHash, ...userData } = user._doc;

    return {
      data: userData,
      token,
    };
  }
}

export default new UserService();
