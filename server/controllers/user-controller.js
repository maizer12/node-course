import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import userService from '../services/user-service.js';

class UserController {
  async registration(req, res) {
    try {
      const data = await userService.registration(req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({
        message: 'Failed to register',
      });
    }
  }

  async authorization(req, res) {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });

      if (!user) return res.status(400).json({ message: 'Incorrect email or password!' });

      const isPassword = await bcrypt.compare(req.body.password.toString(), user.passwordHash);

      if (!isPassword) return res.status(400).json({ message: 'Incorrect email or password!' });

      const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

      const { passwordHash, ...data } = user._doc;

      res.json({
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Failed to login',
      });
    }
  }

  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.id);

      if (!user) return res.status(404).json({ message: 'User not found!' });

      const { passwordHash, ...data } = user._doc;

      res.json({ data });
    } catch (err) {
      res.status(403).json({
        message: 'No access',
      });
    }
  }
}

export default new UserController();
