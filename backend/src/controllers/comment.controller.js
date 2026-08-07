const commentService =
  require("../services/comment.service");



async function create(req, res) {

  try {


    const comment =
      await commentService.createComment(
        req.body,
        req.user.id
      );


    res.status(201).json(comment);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}




async function getByPost(req, res) {

  try {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    const comments =
      await commentService.getPostComments(
        postId
      );


    res.json(comments);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}




async function remove(req, res) {

  try {


    const result =
      await commentService.deleteComment(
        req.params.id,
        req.user.id,
        req.user.role
      );


    res.json(result);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}



module.exports = {
  create,
  getByPost,
  remove
};