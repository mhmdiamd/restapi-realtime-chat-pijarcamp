import { generateRefreshToken, generateToken } from '../Helpers/token.js';

export async function regenerateToken(user, oldToken) {
  const newAccessToken = generateToken(user);
  const newRefreshToken = generateRefreshToken(user);

  return { newAccessToken, newRefreshToken };
}
