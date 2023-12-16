import {
  GOOGLE_ADMIN_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_USER_REDIRECT_URI,
} from "../../config";

export const getGoogleUrl = (isAdmin: boolean) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: isAdmin
      ? GOOGLE_ADMIN_REDIRECT_URI
      : GOOGLE_USER_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
