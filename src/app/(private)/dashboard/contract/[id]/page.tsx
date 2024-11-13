'use client';

import { use } from 'react';
import ContractResults from './_components/ContractResults';

export default function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <ContractResults contractId={id} />;
}
