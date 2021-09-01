const Users = require('./../users/users-model');
const Posts = require('./../posts/posts-model');

function logger(req, res, next) {
  const url = req.originalUrl;
  const method = req.method;
  const timestamp = new Date().toLocaleString
  console.log(`${method}, ${url}, ${timestamp}`)
  next();
}

function validateUserId(req, res, next) {
  const userId = req.params.id;
  Users.getById(userId)
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
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  if (!post.text) {
    res.status(400).json({ message: "missing required text field" })
    // next({status: 400, message: "missing required text field" });
  } else {
    next();
  } 
}

module.exports = { logger, validateUserId, validateUser, validatePost }