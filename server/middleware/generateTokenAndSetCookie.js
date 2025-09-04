import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,       // Render uses HTTPS
    sameSite: 'none',   // required for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000
  });
};


export default generateTokenAndSetCookie;