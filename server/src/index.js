import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from '../validations/auth.js';
import { body, validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log('db is work'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ user: 'petro' });
});

app.post('/auth/login', async (req, res) => {
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
});
app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.toString(), salt);

    const doc = new UserModel({ ...req.body, passwordHash: hash });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

    const { passwordHash, ...data } = user._doc;

    res.json({
      data,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to register',
    });
  }
});

app.listen(process.env.PORT, (rej) => {
  if (rej) return console.log(rej);
  console.log('Server started ' + process.env.PORT);
});
