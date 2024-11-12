'use client';

import ContractAnalysisResults from '@/components/analysis/ContractAnalysisResults';
import { useContractStore } from '@/store/zustand';

export default function ContractResultsPage() {
  const analysisResults = useContractStore((state) => state.analysisResults);

  return (
    <ContractAnalysisResults
      analysisResults={analysisResults}
      contractId={analysisResults?._id ?? ''}
      isActive={false}
      onUpgrade={() => {}}
    />
  );
}
