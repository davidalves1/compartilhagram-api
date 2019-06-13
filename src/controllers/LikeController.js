const Post = require("../models/Post");

module.exports = {
  async index(req, res) {},
  async show(req, res) {},
  async store(req, res) {
    const post = await Post.findById(req.params.id)

    console.log(post)

    post.likes += 1

    await post.save()

    req.io.emit('like', post)

    return res.json(post);
  },
  async update(req, res) {},
  async delete(req, res) {}
};
