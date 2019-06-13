const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt')

    return res.json(posts)
  },
  async show(req, res) {},
  async store(req, res) {
    const {
      filename: image
    } = req.file;

    const [name] = image.split('.')

    const fileName = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName))

    fs.unlinkSync(req.file.path)

    const response = await Post.create({
      ...req.body,
      image: fileName
    })

    req.io.emit('post', post)

    return res.json(response)
  },
  async update(req, res) {},
  async delete(req, res) {},
};
