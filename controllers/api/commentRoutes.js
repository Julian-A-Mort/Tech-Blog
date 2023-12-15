const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../middleware/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all comments for a post
router.get('/post/:postId/comments', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.postId },
    });
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, 
      },
    });

    if (!updatedComment) {
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, 
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
