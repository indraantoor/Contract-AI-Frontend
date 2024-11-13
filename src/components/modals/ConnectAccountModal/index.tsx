'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useModalStore } from '@/store/zustand';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    resolve();
  });
}

export function ConnectAccountModal() {
  const [isAgreed, setIsAgreed] = useState(false);
  const modalKey = 'connectAccountModal';
  const { isOpen, closeModal } = useModalStore();

  const mutation = useMutation({
    mutationFn: googleSignIn,
    onSuccess: () => {
      closeModal(modalKey);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleGoogleSignIn = async () => {
    if (isAgreed) {
      mutation.mutate();
    } else {
      toast.error('Please agree to the terms and conditions');
    }
  };

  return (
    <Dialog
      open={isOpen(modalKey)}
      onOpenChange={() => closeModal(modalKey)}
      key={modalKey}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Google Account</DialogTitle>
          <DialogDescription>
            Please connect your Google account to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={!isAgreed || mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <>Sign in with Google</>
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
