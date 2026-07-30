const prisma = require("../config/prisma");



async function createPost(data, files, userId) {

  if (!files || files.length === 0) {
    throw new Error("Select at least one image");
  }

  const images = files.map(file => `/uploads/${file.filename}`);

  return prisma.post.create({

    data: {
      title: data.title,
      description: data.description,
      country: data.country,
      city: data.city,

      images,

      authorId: userId
    }

  });


}



async function getPosts(filters = {}) {

  const where = {};

  if (filters.country) {
    where.country = filters.country;
  }

  if (filters.city) {
    where.city = filters.city;
  }

  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: "insensitive"
    };
  }

  let orderBy = {
    createdAt: "desc"
  };

  if (filters.sort === "oldest") {
    orderBy = {
      createdAt: "asc"
    };
  }

  if (filters.sort === "newest") {
    orderBy = {
      createdAt: "desc"
    };
  }

  return prisma.post.findMany({

    where,

    include: {

      author: {

        select: {
          username: true,
          city: true
        }

      },

      _count: {

        select: {
          likes: true,
          comments: true
        }

      }

    },

    orderBy

  });

}



async function getPostById(id) {

  return prisma.post.findUnique({

    where: {
      id: Number(id)
    },

    include: {

      author: {
        select: {
          username: true,
          city: true,
          country: true
        }
      },

      comments: {
        include: {
          author: {
            select: {
              username: true
            }
          }
        }
      },

      _count: {
        select: {
          likes: true,
          comments: true
        }
      }

    }

  });

}

async function updatePost(id, data, files, user) {

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

  let images = post.images;

  if (files && files.length > 0) {
    images = files.map(file => `/uploads/${file.filename}`);
  }

  return prisma.post.update({

    where: {
      id: Number(id)
    },

    data: {
      title: data.title,
      description: data.description,
      images,
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

async function getMyPosts(userId) {
  return prisma.post.findMany({
    where: {
      authorId: userId
    },

    include: {
      author: {
        select: {
          username: true,
          city: true
        }
      },

      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    },

    orderBy: {
      createdAt: "desc"
    }
  });
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts
};