import {
  ApiResponse,
  AuthenticateModel,
  CurrentUserProfileEditDto,
} from "@/types";
import { AuthTokens, http } from "../http";

export const authApi = {
  login: (data: AuthenticateModel) =>
    http.post<AuthTokens, AuthenticateModel>({
      url: "/api/auth",
      data,
      isApiRoutes: true,
      isSecure: false,
    }),
  logOut: () => {
    return http.get<ApiResponse<void>>({
      url: "/api/TokenAuth/LogOut",
    });
  },
  getCurrentUserProfile: () =>
    http.get<ApiResponse<CurrentUserProfileEditDto>>({
      url: "/api/services/app/Profile/GetCurrentUserProfileForEdit",
    }),
};
