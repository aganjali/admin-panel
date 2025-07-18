export const getAvatar = (uId: number) =>
  `https://admin-dev.tokenise.io/Profile/GetProfilePictureByUser?userId=${encodeURIComponent(
    uId
  )}`;
