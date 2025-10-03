'use client';

import { useAuth } from '@/lib/auth-context';
import AdminNav from '@/components/admin-nav';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-900 text-white min-h-screen">
      <div className={`fixed z-30 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <AdminNav />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <Link href="/">
                    <Image src="/logo.png" alt="The Great Run Logo" width={80} height={20} />
                </Link>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md text-white">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
        
        <main className="flex-1 p-4 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
