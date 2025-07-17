import {
  ApiResponse,
  ApiServicesAppUserDeleteuserDeleteParams,
  ApiServicesAppUserGetuserforeditGetParams,
  ApiServicesAppUserGetuserpermissionsforeditGetParams,
  ApiServicesAppUserGetusersGetParams,
  ApiServicesAppUserGetusersfordropdownGetParams,
  ApiServicesAppUserGetuserstoexcelGetParams,
  CreateOrUpdateUserInput,
  EntityDto,
  FileDto,
  GetUserForEditOutput,
  GetUserPermissionsForEditOutput,
  PagedResultDtoOfUserListDto,
  UpdateUserPermissionsInput,
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
  getUsersToExcel: (params: ApiServicesAppUserGetuserstoexcelGetParams) =>
    http.get<ApiResponse<FileDto>, ApiServicesAppUserGetuserstoexcelGetParams>({
      url: "/api/services/app/User/GetUsersToExcel",
      params,
    }),
  getUserExcelColumnsToExcel: () =>
    http.get<ApiResponse<string[]>>({
      url: "/api/services/app/User/GetUserExcelColumnsToExcel",
    }),
  getUserPermissionsForEdit: (
    params: ApiServicesAppUserGetuserpermissionsforeditGetParams
  ) =>
    http.get<
      ApiResponse<GetUserPermissionsForEditOutput>,
      ApiServicesAppUserGetuserpermissionsforeditGetParams
    >({
      url: "/api/services/app/User/GetUserPermissionsForEdit",
      params,
    }),
  resetUserSpecificPermissions: (data: EntityDto) =>
    http.post<ApiResponse<void>, EntityDto>({
      url: "/api/services/app/User/ResetUserSpecificPermissions",
      data,
    }),
  updateUserPermissions: (data: UpdateUserPermissionsInput) =>
    http.put<ApiResponse<void>, UpdateUserPermissionsInput>({
      url: "/api/services/app/User/UpdateUserPermissions",
      data,
    }),
  unlockUser: (data: EntityDto) =>
    http.post<ApiResponse<void>, EntityDto>({
      url: "/api/services/app/User/UnlockUser",
      data,
    }),
  getUsersForDropDown: (
    params: ApiServicesAppUserGetusersfordropdownGetParams
  ) =>
    http.get<
      ApiResponse<PagedResultDtoOfUserListDto>,
      ApiServicesAppUserGetusersfordropdownGetParams
    >({
      url: "/api/services/app/User/GetUsersForDropDown",
      params,
    }),
};
