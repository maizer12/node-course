import PostModel from '../models/Post.js';
import postService from '../services/post-service.js';
import TagsService from '../services/tags-service.js';

class PostController {
  async createPost(req, res) {
    try {
      const post = await postService.create({ ...req.body, user: req.id });
      res.json(post);
    } catch (err) {
      res.status(404).json({
        message: 'Failed to create post',
      });
    }
  }
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const findPost = await PostModel.findByIdAndDelete(id);
      res.json({ message: true });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: 'Failed to delete post',
      });
    }
  }
  async updatePost(req, res) {
    try {
      const id = req.params.id;
      const newPost = await PostModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnDocument: 'after' },
      ).populate('user');
      res.json({ newPost });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: 'Failed to update post',
      });
    }
  }

  async getAll(req, res) {
    try {
      const { sort, tag } = req.query;
      const posts = await postService.getPosts({ sort, tag });
      res.json(posts);
    } catch (err) {
      res.status(404).json({
        message: 'Failed to get posts',
      });
    }
  }

  async getLastTags(req, res) {
    try {
      const tags = await TagsService.getTags();
      res.json(tags);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: 'Failed to get tags',
      });
    }
  }
  async getOne(req, res) {
    try {
      const id = req.params.id;
      const doc = await PostModel.findOneAndUpdate(
        { _id: id },
        { $inc: { viewsCount: 1 } },
        { returnDocument: 'after' },
      ).populate('user');

      if (!doc) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      res.json(doc);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: 'Failed to get post',
      });
    }
  }
}

export default new PostController();
