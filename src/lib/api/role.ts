import {
  ApiResponse,
  ApiServicesAppRoleDeleteroleDeleteParams,
  ApiServicesAppRoleGetroleforeditGetParams,
  CreateOrUpdateRoleInput,
  GetRoleForEditOutput,
  GetRolesInput,
  ListResultDtoOfRoleListDto,
} from "@/types";
import { http } from "../http";

export const roleApi = {
  getRoles: (data: GetRolesInput = { permissions: [] }) =>
    http.post<ApiResponse<ListResultDtoOfRoleListDto>, GetRolesInput>({
      url: "/api/services/app/Role/GetRoles",
      data,
    }),
  getRoleForEdit: (params: ApiServicesAppRoleGetroleforeditGetParams) =>
    http.get<
      ApiResponse<GetRoleForEditOutput>,
      ApiServicesAppRoleGetroleforeditGetParams
    >({
      url: "/api/services/app/Role/GetRoleForEdit",
      params,
    }),
  createOrUpdateRole: (data: CreateOrUpdateRoleInput) =>
    http.post<ApiResponse<void>, CreateOrUpdateRoleInput>({
      url: "/api/services/app/Role/CreateOrUpdateRole",
      data,
    }),
  deleteRole: (params: ApiServicesAppRoleDeleteroleDeleteParams) =>
    http.del<ApiResponse<void>, void, ApiServicesAppRoleDeleteroleDeleteParams>(
      {
        url: "/api/services/app/Role/DeleteRole",
        params,
      }
    ),
};
