import PostModel from '../models/Post.js';

class PostService {
  async create(data) {
    const doc = new PostModel(data);
    const post = await doc.save();
    return post;
  }
  async getPosts({ sort, tag }) {
    const getSort = sort === 'popular' ? { viewsCount: -1 } : { createdAt: -1 };
    const posts = await PostModel.find(!!tag ? { tags: tag } : {})
      .sort(getSort)
      .populate('user')
      .exec();
    return posts;
  }
}

export default new PostService();
