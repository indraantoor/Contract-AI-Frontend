'use client';

import { UploadModal } from '@/components/modals/UploadModal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={() => setIsUploadModalOpen(true)}>
        Upload Contract
      </Button>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(true)}
      />
    </div>
  );
}