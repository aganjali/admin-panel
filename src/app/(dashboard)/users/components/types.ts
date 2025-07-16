// API Response Types
export interface ApiRole {
  roleId: number;
  roleName: string;
}

export interface ApiUser {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  lockoutEndDateUtc: string | null;
  phoneNumber: string | null;
  profilePictureId: string | null;
  isEmailConfirmed: boolean;
  roles: ApiRole[];
  isActive: boolean;
  creationTime: string;
  id: number;
}

export interface ApiResponse {
  result: {
    totalCount: number;
    items: ApiUser[];
  };
  targetUrl: string | null;
  success: boolean;
  error: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

// Transformed User Type for UI
export interface User {
  id: number;
  username: string;
  firstName: string;
  surname: string;
  roles: string[];
  email: string;
  emailConfirm: boolean;
  active: boolean;
  creationTime: string;
  lastLogin: string;
  department: string;
  phoneNumber: string | null;
}

export interface Filters {
  roles: string[];
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Filters;
}
