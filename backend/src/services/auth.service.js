const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");



async function register(data) {


  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });


  if (existingUser) {
    throw new Error("Email already exists");
  }



  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );



  const user = await prisma.user.create({

    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      country: data.country,
      city: data.city
    }

  });


  return user;

}




async function login(email, password) {


  const user =
    await prisma.user.findUnique({
      where: {
        email
      }
    });



  if (!user) {
    throw new Error("Invalid email or password");
  }



  const passwordValid =
    await bcrypt.compare(
      password,
      user.password
    );



  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }



  const token =
    generateToken(user);



  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  };

}

async function me(id) {
  return prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      country: true,
      city: true,
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
  register,
  login,
  me
};