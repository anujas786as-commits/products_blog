'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Lock, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card border rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black">Admin Access</h1>
          <p className="text-muted-foreground text-sm">Enter password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl" disabled={loading}>
            {loading ? 'Verifying...' : 'Unlock Portal'}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Protected Area • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
