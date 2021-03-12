const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }).isString(),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.postPost
);

router.get('/post/:postId', isAuth, feedController.getPost);

router.get('/status', isAuth, feedController.getStatus);
router.patch('/status', isAuth, feedController.updateStatus);

router.put(
  '/post/:postId',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }).isString(),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
