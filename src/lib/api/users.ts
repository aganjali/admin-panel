import { GetUsersInput, PagedResultDtoOfUserListDto } from "@/types";
import { http } from "../http";

export const usersApi = {
  getUsers: (data: GetUsersInput) =>
    http.post<PagedResultDtoOfUserListDto, GetUsersInput>({
      url: "/api/services/app/User/GetUsers",
      data,
    }),
};
