const postService = require("../services/post.service");



async function create(req, res) {

  try {

    const post =
      await postService.createPost(
        req.body,
        req.files,
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
  console.log(req.query);

  const posts =
    await postService.getPosts(req.query);


  res.json(posts);

}



async function getOne(req, res) {

  const post =
    await postService.getPostById(
      req.params.id
    );


  res.json(post);

}

async function update(req, res) {

  try {


    const post =
      await postService.updatePost(
        req.params.id,
        req.body,
        req.files,
        req.user
      );


    res.json(post);



  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}




async function remove(req, res) {

  try {


    const result =
      await postService.deletePost(
        req.params.id,
        req.user
      );


    res.json(result);



  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}

async function getMy(req, res) {
  const posts = await postService.getMyPosts(req.user.id);
  res.json(posts);
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getMy
};