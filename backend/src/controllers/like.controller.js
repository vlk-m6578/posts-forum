const likeService = require("../services/like.service");



async function addLike(req, res) {

  try {

    const userId = req.user.id;
    const postId = Number(req.params.postId);


    const like = await likeService.addLike(
      userId,
      postId
    );


    res.json(like);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}




async function removeLike(req, res) {

  try {

    const userId = req.user.id;
    const postId = Number(req.params.postId);


    await likeService.removeLike(
      userId,
      postId
    );


    res.json({
      message: "Like removed"
    });


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}

async function getLikeStatus(req, res) {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.postId);

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    res.json({
      isLiked: !!like
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}



module.exports = {
  addLike,
  removeLike,
  getLikeStatus
};