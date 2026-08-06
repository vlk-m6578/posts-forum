const prisma = require("../config/prisma");

async function getProfile(id) {
  return prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          likes: true,
          comments: true
        }
      },
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

async function getMyProfile(userId) {
  return prisma.user.findUnique({
    where: {
      id: Number(userId)
    },
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          likes: true,
          comments: true
        }
      }
    }
  });
}

async function updateProfile(userId, data) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (data.username && data.username !== user.username) {
    const existingUser = await prisma.user.findFirst({
      where: {
        username: data.username
      }
    });

    if (existingUser) {
      throw new Error("Username already taken");
    }
  }

  const updateData = {};
  if (data.username) updateData.username = data.username;
  if (data.country !== undefined) updateData.country = data.country;
  if (data.city !== undefined) updateData.city = data.city;

  return prisma.user.update({
    where: {
      id: Number(userId)
    },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          likes: true,
          comments: true
        }
      }
    }
  });
}

module.exports = {
  getProfile,
  getMyProfile,
  updateProfile
};