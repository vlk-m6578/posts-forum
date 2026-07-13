const prisma = require("../config/prisma");



async function createPost(data, userId) {


  if (
    !data.images ||
    data.images.length < 1 ||
    data.images.length > 4
  ) {

    throw new Error(
      "Images must be from 1 to 4"
    );

  }



  return prisma.post.create({

    data: {
      title: data.title,
      description: data.description,
      images: data.images,
      country: data.country,
      city: data.city,

      authorId: userId
    }

  });


}



async function getPosts() {


  return prisma.post.findMany({

    include: {
      author: {
        select: {
          username: true
        }
      },

      comments: true,

      likes: true
    },

    orderBy: {
      createdAt: "desc"
    }

  });


}



async function getPostById(id) {


  return prisma.post.findUnique({

    where: {
      id: Number(id)
    },

    include: {
      author: true,
      comments: true,
      likes: true
    }

  });


}



module.exports = {
  createPost,
  getPosts,
  getPostById
};