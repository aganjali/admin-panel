import type {
  AuthenticateModel,
  CurrentUserProfileDto,
  CurrentUserProfileEditDto,
} from "@/types";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";

// context.tsx
import { createContext } from "react";

export interface UserState {
  user: CurrentUserProfileEditDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  // canTrade: boolean;
  // needsKYC: boolean;
  isActive: boolean;
}

export interface UserActions {
  login: (creds: AuthenticateModel) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CurrentUserProfileDto, Error>>;
}

export type UserContextType = UserState & UserActions;

const defaultState: UserState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  // canTrade: false,
  // needsKYC: false,
  isActive: false,
};

const defaultActions: UserActions = {
  // setUser: () => {
  //   throw new Error('UserProvider not found');
  // },
  // setLoading: () => {
  //   throw new Error('UserProvider not found');
  // },
  login: async () => {
    throw new Error("UserProvider not found");
  },
  logout: async () => {
    throw new Error("UserProvider not found");
  },
  refreshUser: async () => {
    throw new Error("UserProvider not found");
  },
};

export const initialContextState: UserContextType = {
  ...defaultState,
  ...defaultActions,
};

export const UserContext = createContext<UserContextType>(initialContextState);
UserContext.displayName = "UserContext";
