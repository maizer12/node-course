import PostModel from '../models/Post.js';

class TagsService {
  async getTags() {
    const doc = await PostModel.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, title: '$_id', count: 1 } },
    ]);

    return doc.slice(0, 5);
  }
}

export default new TagsService();
