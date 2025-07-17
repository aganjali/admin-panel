import {
  ApiResponse,
  ListResultDtoOfFlatPermissionWithLevelDto,
} from "@/types";
import { http } from "../http";

export const permissionsApi = {
  getAllPermissions: () =>
    http.get<ApiResponse<ListResultDtoOfFlatPermissionWithLevelDto>>({
      url: "/api/services/app/Permission/GetAllPermissions",
    }),
};
