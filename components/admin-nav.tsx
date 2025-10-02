'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Newspaper, Trophy, Users, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminNav() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin/blog', icon: <Newspaper size={20} />, label: 'Blog' },
        { href: '/admin/editions', icon: <Trophy size={20} />, label: 'Editions' },
        { href: '/admin/sponsors', icon: <Users size={20} />, label: 'Sponsors' },
        { href: '/admin/galleries', icon: <ImageIcon size={20} />, label: 'Galleries' },
    ];

    return (
        <nav className="h-full flex flex-col bg-slate-900 border-r border-slate-700 shadow-sm w-64">
            <div className="p-4 py-6 hidden md:flex items-center justify-center">
                <Link href="/">
                    <Image src="/logo.png" alt="The Great Run Logo" width={80} height={20} />
                </Link>
            </div>

            <ul className="flex-1 px-3">
                {navItems.map((item) => (
                    <li key={item.href}>
                       <Link
                            href={item.href}
                            className={`
                                relative flex items-center py-2.5 px-4 my-1
                                font-medium rounded-md cursor-pointer
                                transition-colors group
                                ${
                                    pathname.startsWith(item.href)
                                    ? "bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                                    : "hover:bg-slate-800 text-gray-400 hover:text-white"
                                }
                            `}
                        >
                            {item.icon}
                            <span className="ml-4">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="border-t border-slate-700 p-3">
                <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-md bg-slate-800 text-white font-semibold">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 min-w-0">
                        <h4 className="font-semibold text-sm text-white truncate">{user?.email}</h4>
                    </div>
                </div>
                <button onClick={handleLogout} className="flex items-center justify-center w-full mt-3 p-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors">
                    <LogOut className="mr-2" size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    )
}
