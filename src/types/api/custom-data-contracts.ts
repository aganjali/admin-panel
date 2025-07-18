import { UserListDto } from "./data-contracts";

export type UserListWithAvatarDto = Omit<
  UserListDto,
  "id" | "profilePictureId"
> & {
  fullName: string;
  initials: string;
  id: number;
  avatar: string;
};
