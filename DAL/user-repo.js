const User = require('./../Models/userModel');

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUser = async (id, withPassword) => {
  if (withPassword) {
    return await User.findOne({ email: id }).select('+password');
  }
  return await User.findById(id);
};

exports.updateUser = async (id, body, isNew, runValidators) => {
  return await User.findByIdAndUpdate(id, body, {
    new: isNew,
    runValidators: runValidators
  });
};

exports.deleteUser = async id => {
  return await User.findByIdAndDelete(id);
};

exports.create = async (name, email, password, passwordConfirm) => {
  return await User.create({
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm
  });
};
