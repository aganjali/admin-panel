import {
  ApiResponse,
  AuthenticateModel,
  CurrentUserProfileEditDto,
  GetCurrentLoginInformationsOutput,
  ResetPasswordInput,
  ResetPasswordOutput,
  SendPasswordResetCodeInput,
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
  sendPasswordResetCode: (data: SendPasswordResetCodeInput) =>
    http.post<ApiResponse<void>, SendPasswordResetCodeInput>({
      url: "/api/services/app/Account/SendPasswordResetCode",
      data,
      isSecure: false,
    }),
  resetPassword: (data: ResetPasswordInput) =>
    http.post<ApiResponse<ResetPasswordOutput>, ResetPasswordInput>({
      url: "/api/services/app/Account/ResetPassword",
      data,
      isSecure: false,
    }),

  currentLoginInfo: () =>
    http.get<ApiResponse<GetCurrentLoginInformationsOutput>>({
      url: "/api/services/app/Session/GetCurrentLoginInformations",
      isSecure: true,
    }),
};
