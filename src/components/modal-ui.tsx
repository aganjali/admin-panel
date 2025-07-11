"use client";

import { useUI } from "@/services/managed-ui";
import { Dialog } from "@/components/ui/dialog";

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
      {null}
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
