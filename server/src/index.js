import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from '../validations/auth.js';
import { validationResult } from 'express-validator';
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

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password.toString(), salt);

    const token = jwt.sign(
      {
        email: req.body.email,
        fullName: req.body.fullName,
      },
      'secret123',
    );

    const doc = new UserModel({ ...req.body, passwordHash });

    const user = await doc.save();
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(process.env.PORT, (rej) => {
  if (rej) return console.log(rej);
  console.log('Server started ' + process.env.PORT);
});
