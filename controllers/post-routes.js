const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

router.post('/post', isAuthenticated, authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    if (!user) {
      console.error('User not found.');
      req.session.errors = ['User not found.'];
      return res.redirect('/dashboard');
    }

    const post = await Post.create(req.body);

    await user.addPost(post);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    if (error.errors && Array.isArray(error.errors)) {
      req.session.errors = error.errors.map(errObj => errObj.message);
    } else {
      console.error(error);
      req.session.errors = ['An error occurred while processing your request. Please try again.'];
    }
    res.redirect('/dashboard');
  }
});

router.post('/post/:postId/comment', isAuthenticated, authenticate, async (req, res) => {
  try {
      const postId = req.params.postId;
      const { text } = req.body;
      const userId = req.user.id;

      const comment = await Comment.create({
          text: text,
          author_id: userId,
          post_id: postId
      });

      // Manually set the associations
      comment.post_id = postId;
      comment.author_id = userId;
      await comment.save();

      res.redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error posting comment');
  }
});



//  route for deleting a post
router.delete('/post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Delete the post
    await post.destroy();

    res.redirect('/dashboard')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
});

module.exports = router;
