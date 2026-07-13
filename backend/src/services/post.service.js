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

async function updatePost(id, data, user) {

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  });


  if (!post) {
    throw new Error("Post not found");
  }


  // USER может менять только свой пост
  if (
    post.authorId !== user.id &&
    user.role !== "ADMIN"
  ) {
    throw new Error(
      "You can edit only your posts"
    );
  }


  return prisma.post.update({

    where: {
      id: Number(id)
    },

    data: {
      title: data.title,
      description: data.description,
      images: data.images,
      country: data.country,
      city: data.city
    }

  });

}



async function deletePost(id, user) {


  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  });



  if (!post) {
    throw new Error("Post not found");
  }



  // USER только свой
  // ADMIN любой

  if (
    post.authorId !== user.id &&
    user.role !== "ADMIN"
  ) {

    throw new Error(
      "You can delete only your posts"
    );

  }



  await prisma.post.delete({

    where: {
      id: Number(id)
    }

  });



  return {
    message: "Post deleted"
  };

}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};