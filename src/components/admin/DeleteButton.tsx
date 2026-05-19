'use client';

import React, { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
}

export default function DeleteButton({ id, action, label = 'this item' }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete ${label}? This cannot be undone.`)) return;

    startTransition(async () => {
      await action(id);
      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-destructive hover:bg-destructive/10 disabled:opacity-50"
      title={`Delete ${label}`}
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </Button>
  );
}
