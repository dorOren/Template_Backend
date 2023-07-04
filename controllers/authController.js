const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const configurationManager = require('./../common/configurationManager.js');
const userRepo = require('./../DAL/user-repo');

const signToken = id => {
  const secret = configurationManager.getJWTSecret();
  const jwtExpiresIn = configurationManager.getJWTExpiresIn();
  return jwt.sign({ id }, secret, {
    expiresIn: jwtExpiresIn
  });
};

exports.signup = async (req, res) => {
  try {
    console.log('authController::signup called');
    const newUser = await userRepo.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'authController::signup:: success',
      token: token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'authController::signup:: error',
      msg: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('authController::login called');
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    // 2) Check if user exists && password is correct
    const user = await userRepo.getUser(email, true);

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Incorrect email or password');
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'authController::login:: success',
      token: token,
      data: {
        user: user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'authController::login:: error',
      msg: err.message
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    console.log('authController::protect called');
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new Error('You are not logged in. Please log in to get access.');
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      configurationManager.getJWTSecret()
    );

    // 3) Check if user still exists
    const currentUser = await userRepo.getUser(decoded.id, false);
    if (!currentUser) {
      throw new Error('The user belonging to this token does no longer exist.');
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error('User recently changed password. Please log in again.');
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'authController::protect:: error',
      msg: err.message
    });
  }
};
