import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { checkAuth } from './utils/checkAuth.js';
import PostRoutes from './routes/PostRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import multer from 'multer';
import cors from 'cors';

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log('db is work'))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    cd(null, 'uploads');
  },
  filename: (_, file, cd) => {
    const arr = file.originalname.split('.');
    cd(null, Date.now() + '-img.' + arr[arr.length - 1]);
  },
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'Api is work!' });
});

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.use(AuthRoutes);
app.use(PostRoutes);

app.listen(process.env.PORT, (rej) => {
  if (rej) return console.log(rej);
  console.log('Server started ' + process.env.PORT);
});
