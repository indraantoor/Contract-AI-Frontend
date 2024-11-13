'use client';

import ContractAnalysisResults from '@/components/analysis/ContractAnalysisResults';
import EmptyState from '@/components/analysis/EmptyState';
import { useSubscription } from '@/hooks/useSubscription';
import { api } from '@/lib/api';
import stripePromise from '@/lib/stripe';
import { useContractStore } from '@/store/zustand';
import { toast } from 'sonner';

export default function ContractResultsPage() {
  const analysisResults = useContractStore((state) => state.analysisResults);

  const {
    subscriptionStatus,

    setLoading,
  } = useSubscription();

  if (!subscriptionStatus) {
    return <div>Loading...</div>;
  }

  const isActive = subscriptionStatus.status === 'active';

  const handleUpgrade = async () => {
    setLoading(true);
    if (!isActive) {
      try {
        const response = await api.get('/payments/create-checkout-session');
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      } catch (error) {
        console.error(error);
        toast.error('Please try again or login to your account');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('You are already a premium member');
    }
  };

  if (!analysisResults) {
    return <EmptyState title="No Analysis" description="Please try again" />;
  }

  return (
    <ContractAnalysisResults
      contractId={analysisResults._id}
      isActive={isActive}
      analysisResults={analysisResults}
      onUpgrade={handleUpgrade}
    />
  );
}
