const Users = require('./../users/users-model');
const Posts = require('./../posts/posts-model');
const { response } = require('../server');

function logger(req, res, next) {
  const url = req.url;
  const method = req.method;
  const timestamp = Date.now();
  console.log(`${method}, ${url}, ${timestamp}`)
  next();
}

function validateUserId(req, res, next) {
  const userId = req.params.id;
  Users.findById(userId)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  const user = req.body;
  if (!user.name) {
    next({status: 400, message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  if (!post.text) {
    next({status: 400, message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost }