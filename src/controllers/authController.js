import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = async (req, res) => {
  if (await User.exists({ email: req.body.email })) {
    throw createHttpError(400, 'Email in use');
  }

  const password = await bcrypt.hash(req.body.password, 10);
  let user;

  try {
    user = await User.create({ ...req.body, password });
  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError(400, 'Email in use');
    }

    throw error;
  }

  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.status(201).json(user);
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteMany({ userId: user._id });
  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.status(200).json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session =
    sessionId && refreshToken && isValidObjectId(sessionId)
      ? await Session.findOne({ _id: sessionId, refreshToken })
      : null;

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil <= new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  await session.deleteOne();
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);
  res.status(200).json({ message: 'Session refreshed' });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId && isValidObjectId(sessionId)) {
    await Session.findByIdAndDelete(sessionId);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  res.clearCookie('sessionId', cookieOptions);
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.status(204).end();
};
