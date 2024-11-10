import { create } from 'zustand';

interface ContractStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResults: any;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setAnalysisResults: (results: any) => void;
}

const useContractStore = create<ContractStore>((set) => ({
  analysisResults: undefined,
  setAnalysisResults(results) {
    set({ analysisResults: results });
  },
}));

export { useContractStore };
