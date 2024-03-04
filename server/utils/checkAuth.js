import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error('No token provided');
    const data = await jwt.decode(token);
		req.id = data._id
		next()
  } catch (error) {
    res.status(403).json({
      message: 'No access',
    });
  }
};
