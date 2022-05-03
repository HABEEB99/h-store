import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const authentication = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.splice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ error: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(401).send({ error: 'Token not found' });
  }
};

export default signToken;
