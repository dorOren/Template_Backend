const userRepo = require('./../DAL/user-repo');

exports.getAllUsers = async (req, res) => {
  const users = await userRepo.getAllUsers();
  try {
    res.status(200).json({
      status: 'userController::getAllUsers:: success',
      data: {
        users: users
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'userController::getAllUsers:: error:',
      msg: err
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await userRepo.getUser(req.params.id, false);

    res.status(200).json({
      status: 'userController::getUser:: success',
      data: {
        user: user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'userController::getUser:: error:',
      msg: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const newUser = await userRepo.updateUser(
      req.params.id,
      req.body,
      true,
      true
    );

    res.status(201).json({
      status: 'userController::updateUser:: success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'userController::updateUser:: error:',
      msg: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userRepo.deleteUser(req.params.id);

    res.status(204).json({
      status: 'userController::deleteUser:: success',
      data: {
        user: user
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'userController::deleteUser:: error:',
      msg: err
    });
  }
};
