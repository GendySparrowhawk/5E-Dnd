const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

// create a poat route
router.post('/post', isAuthenticated, authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    if (!user) {
      console.error('User not found.');
      req.session.errors = ['User not found.'];
      return res.redirect('/dashboard');
    }
    // creat new post with nbody
    const post = await Post.create(req.body);
    // assosicates the post with a user
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

// create a comment 
router.post('/post/:postId/comment', isAuthenticated, authenticate, async (req, res) => {
  try {
    // grab the thiings we need form the docs
      const postId = req.params.postId;
      const { text } = req.body;
      const userId = req.user.id;
// create a new comment
      const comment = await Comment.create({
          text: text,
          author_id: userId,
          post_id: postId
      });

      // Manually set the associations, could not get it to work otherwise
      comment.post_id = postId;
      comment.author_id = userId;
      await comment.save();
      // reload the landing page
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

router.put('/post/:postId', isAuthenticated, async (req, res) => {
  try {
      const postId = req.params.postId;
      const updatedText = req.body.updatedText;

      // Check if the post exists
      const post = await Post.findByPk(postId);
      if (!post) {
          return res.status(404).send('Post not found');
      }

      // Update the post
      post.text = updatedText;
      await post.save();

      res.redirect('/dashboard');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating post');
  }
});


module.exports = router;
