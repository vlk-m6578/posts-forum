const postService = require("../services/post.service");



async function create(req, res) {

  try {

    const post =
      await postService.createPost(
        req.body,
        req.user.id
      );


    res.status(201).json(post);


  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}




async function getAll(req, res) {

  const posts =
    await postService.getPosts();


  res.json(posts);

}



async function getOne(req, res) {

  const post =
    await postService.getPostById(
      req.params.id
    );


  res.json(post);

}



module.exports = {
  create,
  getAll,
  getOne
};