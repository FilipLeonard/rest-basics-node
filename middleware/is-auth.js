const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  console.log({ token });
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'supersecret');
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId; //all further middleware will have the userId on the req obj
  next();
};
