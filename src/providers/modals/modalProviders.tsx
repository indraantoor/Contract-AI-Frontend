import { ConnectAccountModal } from '@/components/modals/ConnectAccountModal';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ConnectAccountModal />
    </>
  );
}
