export const PORT_CLIENT = 3000;
export const PORT_SERVER = 4000;
export const ENV: "DEV" | "PROD" = "DEV";
export const BACKEND_URL =
  ENV === "DEV" ? `http://localhost:${PORT_SERVER}` : "";
export const FRONTEND_URL =
  ENV === "DEV" ? `http://localhost:${PORT_CLIENT}` : "";

export const GOOGLE_ADMIN_REDIRECT_URI = "http://localhost:4000/admin/callback";
export const GOOGLE_USER_REDIRECT_URI = "http://localhost:4000/user/callback";
export const GOOGLE_CLIENT_ID = "";
