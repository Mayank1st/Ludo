const setTokensCookies = (
  res,
  accessToken,
  refreshToken,
  newAccessTokenExp,
  newRefreshTokenExp
) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const accessTokenMaxAge = (newAccessTokenExp - currentTime) * 1000;
  const refreshTokenMaxAge = (newRefreshTokenExp - currentTime) * 1000;

  // Set Cookie for Access Token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS)
    maxAge: accessTokenMaxAge,
    sameSite: "none",
  });

  // Set Cookie for Refresh Token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS)
    maxAge: refreshTokenMaxAge,
    sameSite: "none",
  });

  // Set Cookie for is_auth (accessible via client-side)
  res.cookie("is_auth", true, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS)
    maxAge: refreshTokenMaxAge,
    sameSite: "none",
  });
};

export default setTokensCookies;