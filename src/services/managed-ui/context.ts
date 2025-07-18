import type { RequiredProp } from "@/types";
import type { DialogContentProps } from "@/components/ui/dialog";

import { createContext } from "react";

export interface WalletPasswordViewArgs {
  submitFn?: (password: string) => Promise<void>;
}

export interface DeleteUserViewArgs {
  userId: number;
  userName?: string;
  onConfirm: () => Promise<void>;
}

export interface UserPermissionsViewArgs {
  userId: number;
  userName?: string;
}

export interface FilterPermissionsViewArgs {}

export interface ImportExcelViewArgs {}

export type MODAL_ARGS =
  | {
      name: "WALLET_PASSWORD";
      args: WalletPasswordViewArgs;
    }
  | {
      name: "DELETE_USER";
      args: DeleteUserViewArgs;
    }
  | {
      name: "USER_PERMISSIONS";
      args: UserPermissionsViewArgs;
    }
  | {
      name: "FILTER_PERMISSIONS";
      args: FilterPermissionsViewArgs;
    }
  | {
      name: "IMPORT_EXCEL";
      args: ImportExcelViewArgs;
    };

export type ModalProps = DialogContentProps & {
  onModalClose?: () => void;
};
export type UserModalViewArgs = MODAL_ARGS & {
  props?: ModalProps;
};

export type ModalView = RequiredProp<UserModalViewArgs, "props"> & {
  onModalClose?: () => void;
};

export interface IManagedUIReducerState {
  displayModal: boolean;
  modalView: ModalView;
}
export interface IManagedUIFunctions {
  openModal: () => void;
  closeModal: () => void;

  setModalView: (_view: UserModalViewArgs) => void;
  walletPasswordResolver: () => Promise<string>;
}
export interface IManagedUIState {}

export type ManagedUIAction =
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: ModalView;
    };

export type IManagedUIContextState = IManagedUIReducerState & IManagedUIState;
export type ManagedUIContextType = IManagedUIContextState & IManagedUIFunctions;

export const initialReducer: IManagedUIReducerState = {
  displayModal: false,
  modalView: {
    props: { cancelable: true },
    name: "WALLET_PASSWORD",
    args: {},
  },
};

export const initialState: IManagedUIState = {};

const initialFunctions: IManagedUIFunctions = {
  closeModal() {
    throw new Error("not implemented");
  },
  openModal() {
    throw new Error("not implemented");
  },
  setModalView() {
    throw new Error("not implemented");
  },
  walletPasswordResolver() {
    throw new Error("not implemented");
  },
};

export const initialContextState: ManagedUIContextType = {
  ...initialReducer,
  ...initialState,
  ...initialFunctions,
};

const ManagedUIContext = createContext(initialContextState);
ManagedUIContext.displayName = "ManagedUIContext";

export { ManagedUIContext };
