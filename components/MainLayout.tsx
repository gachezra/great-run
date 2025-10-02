'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminPage && <Navbar />}
            <main className="min-h-screen">{children}</main>
            {!isAdminPage && <Footer />}
        </>
    );
}
