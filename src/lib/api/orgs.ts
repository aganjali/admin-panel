import { ApiResponse, ListResultDtoOfOrganizationUnitDto } from "@/types";
import { http } from "../http";

export const orgsApi = {
  getOrgs: () =>
    http.get<ApiResponse<ListResultDtoOfOrganizationUnitDto>>({
      url: "/api/services/app/OrganizationUnit/GetOrganizationUnits",
    }),
};
