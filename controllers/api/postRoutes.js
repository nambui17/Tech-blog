const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const moment = require('moment');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: {
        id: req.params.id,
      },
      include: {
        model: Comment,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      time: moment().format(),
    });
    // render the homepage with the new post
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(400).json({ message: 'No project found with this id!' });
      return;
    }
    // render the page again maybe without post with handlebars
    res.status(200).json(postData);
  } catch (err) {}
});

module.exports = router;
