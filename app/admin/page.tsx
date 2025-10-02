'use client';

import { useAuth } from '@/lib/auth-context';
import { Newspaper, Trophy, Users, Image as ImageIcon } from 'lucide-react';

const stats = [
    { name: 'Blog Posts', stat: '24', icon: <Newspaper size={24} /> },
    { name: 'Editions', stat: '12', icon: <Trophy size={24} /> },
    { name: 'Sponsors', stat: '36', icon: <Users size={24} /> },
    { name: 'Gallery Images', stat: '128', icon: <ImageIcon size={24} /> },
];

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.email}</h1>
        <p className="text-gray-400 mb-8">This is the admin dashboard. Here you can manage the content of your website.</p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
                <div key={item.name} className="bg-slate-800/50 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-md text-white">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-400 truncate">
                                        {item.name}
                                    </dt>
                                    <dd className="text-2xl font-bold text-white">
                                        {item.stat}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
