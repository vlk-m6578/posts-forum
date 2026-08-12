const service = require("../services/user.service");

async function getMyProfile(req, res) {
  try {
    const user = await service.getMyProfile(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const user = await service.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getProfile(req, res) {
  try {
    const user = await service.getProfile(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const result = await service.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getProfile,
  getMyProfile,
  updateProfile,
  getAllUsers,
  deleteUser
};