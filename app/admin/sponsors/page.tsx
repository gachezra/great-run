'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSponsors, deleteSponsor } from '@/lib/firestore';
import { Sponsor } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Search } from 'lucide-react';

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const data = await getSponsors();
        setSponsors(data);
      } catch (error) {
        console.error('Failed to load sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this sponsor?')) {
      try {
        await deleteSponsor(id);
        setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
      } catch (error) {
        console.error('Failed to delete sponsor:', error);
      }
    }
  };

  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Sponsors</h1>
        <Link href="/admin/sponsors/new">
          <Button className="bg-green-500 hover:bg-green-600 text-black">
            <PlusCircle className="mr-2 h-4 w-4" /> New Sponsor
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search sponsors..."
          className="pl-10 pr-4 py-2 w-full sm:w-1/2 bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-lg">
          <Table className="text-white">
            <TableHeader>
              <TableRow className="border-b-gray-700">
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Website</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor) => (
                <TableRow key={sponsor.id} className="border-b-gray-700">
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>
                    <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {sponsor.website}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/sponsors/${sponsor.id}/edit`}>
                      <Button variant="outline" size="sm" className="mr-2 bg-gray-700 border-gray-600 hover:bg-gray-600">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(sponsor.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
