const prisma = require("../config/prisma");



async function createComment(data, userId) {


  const post =
    await prisma.post.findUnique({
      where: {
        id: Number(data.postId)
      }
    });



  if (!post) {
    throw new Error("Post not found");
  }



  return prisma.comment.create({

    data: {
      text: data.text,

      postId: Number(data.postId),

      authorId: userId
    },

    include: {
      author: {
        select: {
          username: true
        }
      }
    }

  });

}




async function getPostComments(postId) {


  return prisma.comment.findMany({

    where: {
      postId: Number(postId)
    },


    include: {
      author: {
        select: {
          username: true,
          country: true,
          city: true
        }
      }
    },


    orderBy: {
      createdAt: "desc"
    }

  });

}




async function deleteComment(id) {


  const comment =
    await prisma.comment.findUnique({

      where: {
        id: Number(id)
      }

    });



  if (!comment) {
    throw new Error("Comment not found");
  }



  await prisma.comment.delete({

    where: {
      id: Number(id)
    }

  });



  return {
    message: "Comment deleted"
  };

}



module.exports = {
  createComment,
  getPostComments,
  deleteComment
};