'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authstore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Github, Twitter } from 'lucide-react';

export function RegisterPage() {
  const router = useRouter();

  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register(email, password, name);
    } catch {
      setError('Registration failed. Try another email.');
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-background border-r">
        <div>
          <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mb-8 font-black">
            A
          </div>
          <h1 className="text-6xl font-black leading-[0.9] mb-4">
            CREATE<br />ACCOUNT.
          </h1>
          <p className="text-muted-foreground">
            Start your 14-day free trial.
          </p>
        </div>
        <div className="text-xs uppercase text-muted-foreground">
          © 2025 AVSTECH Inc.
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold">Create account</h2>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 border rounded">
              {error}
            </p>
          )}

          <Input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Registering…' : <>Sign Up <ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>

          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline"><Github className="mr-2 h-4 w-4" /> Github</Button>
            <Button variant="outline"><Twitter className="mr-2 h-4 w-4" /> Twitter</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
