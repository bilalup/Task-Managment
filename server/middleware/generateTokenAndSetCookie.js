import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',                // or 'none' if cross-site
    secure: process.env.NODE_ENV === 'production', // only true in production
    maxAge: 24 * 60 * 60 * 1000     // 1 day
  });
};
