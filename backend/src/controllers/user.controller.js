const service = require("../services/user.service");

async function getProfile(req, res) {

  const user = await service.getProfile(
    req.params.id
  );

  res.json(user);

}

module.exports = {
  getProfile
};