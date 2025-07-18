"use client";

import { useUI } from "@/services/managed-ui";
import { Dialog } from "@/components/ui/dialog";
import { DeleteUserView } from "@/components/modals/delete-user-view";
import { UserPermissionsView } from "@/components/modals/user-permissions-view";
import { FilterPermissionsView } from "./modals/filter-permissions-view";
import { ImportExcelView } from "./modals/import-excel-view";

interface Props {}

const ModalUI: React.FC<Props> = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          if (modalView.props.cancelable) closeModal();
        }
      }}
      open={displayModal}
    >
      {modalView.name === "DELETE_USER" ? (
        <DeleteUserView modalView={modalView} />
      ) : modalView.name === "USER_PERMISSIONS" ? (
        <UserPermissionsView modalView={modalView} />
      ) : modalView.name === "FILTER_PERMISSIONS" ? (
        <FilterPermissionsView modalView={modalView} />
      ) : modalView.name === "IMPORT_EXCEL" ? (
        <ImportExcelView />
      ) : null}
      {/* {modalView.name === "WALLET_PASSWORD" ? (
        <WalletPasswordView modalView={modalView} />
      ) : modalView.name === "WALLET_BACKUP" ? (
        <WalletBackupView modalView={modalView} />
      ) : modalView.name === "WALLET_RECOVER" ? (
        <WalletRecoverView modalView={modalView} />
      ) : modalView.name === "WALLET_WITHDRAW" ? (
        <WalletWithdrawView modalView={modalView} />
      ) : null} */}
    </Dialog>
  );
};
export default ModalUI;
