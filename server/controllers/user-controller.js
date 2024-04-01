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
      const user = await userService.login(req.body.email, req.body.password);
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err });
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

  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserController();
