const prisma = require("../config/prisma");

async function getProfile(id) {

  return prisma.user.findUnique({

    where: {
      id: Number(id)
    },

    select: {

      id: true,

      username: true,

      country: true,

      city: true,

      role: true,

      posts: {

        orderBy: {
          createdAt: "desc"
        },

        select: {

          id: true,

          title: true,

          images: true,

          createdAt: true,

          _count: {
            select: {
              likes: true,
              comments: true
            }
          }

        }

      }

    }

  });

}

module.exports = {
  getProfile
};