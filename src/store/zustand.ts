import { ContractAnalysis } from '@/interfaces/contract.interface';
import { create } from 'zustand';

interface ContractStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResults: ContractAnalysis;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setAnalysisResults: (results: any) => void;
}

const useContractStore = create<ContractStore>((set) => ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  analysisResults: {} as ContractAnalysis,
  setAnalysisResults(results) {
    set({ analysisResults: results });
  },
}));

type ModalState = {
  modals: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  openModal: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  closeModal: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  isOpen: (key: string) => boolean;
};

const useModalStore = create<ModalState>((set, get) => ({
  modals: {},
  openModal: (key: string) =>
    set((state) => ({ modals: { ...state.modals, [key]: true } })),
  closeModal: (key: string) =>
    set((state) => ({ modals: { ...state.modals, [key]: false } })),
  isOpen: (key: string) => Boolean(get().modals[key]),
}));

export { useContractStore, useModalStore };
