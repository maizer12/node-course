import PostModel from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({ ...req.body, user: req.id });
    const post = await doc.save();
    res.json(post);
  } catch(err) {
		console.log(err)
		res.status(404).json({
			message:"Failed to create article"
		})
	}
};
export const getAll = (req, res) => {
  res.send('all okey');
};
