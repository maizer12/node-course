import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from '../validations/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import * as UserController from '../controllers/UserController.js';
import * as PostsController from '../controllers/PostController.js';

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log('db is work'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Api is work!' });
});

app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/login', UserController.authorization);
app.post('/auth/register', registerValidation, UserController.registration);

app.get('/posts', PostsController.getAll);
app.get('/posts/:id', PostsController.getOne);
app.post('/posts', checkAuth, PostsController.createPost);
app.delete('/posts/:id', checkAuth, PostsController.deletePost);
app.patch('/posts/:id', checkAuth, PostsController.updatePost);

app.listen(process.env.PORT, (rej) => {
  if (rej) return console.log(rej);
  console.log('Server started ' + process.env.PORT);
});
