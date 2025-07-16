import {
  ApiResponse,
  ApiServicesAppUserDeleteuserDeleteParams,
  ApiServicesAppUserGetuserforeditGetParams,
  ApiServicesAppUserGetusersGetParams,
  CreateOrUpdateUserInput,
  GetUserForEditOutput,
  PagedResultDtoOfUserListDto,
} from "@/types";
import { http } from "../http";

export const usersApi = {
  getUsers: (params: ApiServicesAppUserGetusersGetParams) =>
    http.get<
      ApiResponse<PagedResultDtoOfUserListDto>,
      ApiServicesAppUserGetusersGetParams
    >({
      url: "/api/services/app/User/GetUsers",
      params,
    }),
  getUserForEdit: (params: ApiServicesAppUserGetuserforeditGetParams) =>
    http.get<
      ApiResponse<GetUserForEditOutput>,
      ApiServicesAppUserGetuserforeditGetParams
    >({
      url: "/api/services/app/User/GetUserForEdit",
      params,
    }),
  createOrUpdateUser: (data: CreateOrUpdateUserInput) =>
    http.post<ApiResponse<void>, CreateOrUpdateUserInput>({
      url: "/api/services/app/User/CreateOrUpdateUser",
      data,
    }),
  deleteUser: (params: ApiServicesAppUserDeleteuserDeleteParams) =>
    http.del<ApiResponse<void>, void, ApiServicesAppUserDeleteuserDeleteParams>(
      {
        url: "/api/services/app/User/DeleteUser",
        params,
      }
    ),
};
