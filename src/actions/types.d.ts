interface User {
  _id: string;
  name: string;
}

interface AuthContextTypeUser {
  user?: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
}
