'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
}

export default function DeleteButton({ id, action, label = "this item" }: DeleteButtonProps) {
  return (
    <form 
      action={async () => {
        if (confirm(`Are you sure you want to delete ${label}?`)) {
          await action(id);
        }
      }}
    >
      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
        <Trash2 size={16} />
      </Button>
    </form>
  );
}
