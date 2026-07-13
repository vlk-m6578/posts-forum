const prisma = require("../config/prisma");


async function addLike(userId, postId) {

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
      }
    }
  });


  if (existingLike) {
    throw new Error("You already liked this post");
  }


  return prisma.like.create({
    data: {
      userId,
      postId
    }
  });
}



async function removeLike(userId, postId) {


  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
      }
    }
  });


  if (!like) {
    throw new Error("Like not found");
  }


  return prisma.like.delete({
    where: {
      id: like.id
    }
  });

}



async function getLikesCount(postId) {

  return prisma.like.count({
    where: {
      postId
    }
  });

}


module.exports = {
  addLike,
  removeLike,
  getLikesCount
};