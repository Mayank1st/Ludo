const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenmaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  // Set Cookie for Access Token
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true, // Set to true for production (HTTPS)
    maxAge: accessTokenMaxAge,
    sameSite: 'strict', // Adjust to 'lax' if your frontend requires cross-site requests
  });

  // Set Cookie for Refresh Token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // Set to true for production (HTTPS)
    maxAge: refreshTokenmaxAge,
    sameSite: 'strict', // Adjust to 'lax' if needed
  });

  // Set Cookie for is_auth (accessible via client-side)
  res.cookie('is_auth', true, {
    httpOnly: false, // Allows client-side JavaScript access
    secure: true, // Set to true for production (HTTPS)
    maxAge: refreshTokenmaxAge,
    sameSite: 'strict', // Adjust according to your cross-site requirements
  });
};

export default setTokensCookies;
