'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getGalleries, deleteGallery } from '@/lib/firestore';
import { Gallery } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Search } from 'lucide-react';

export default function AdminGalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const data = await getGalleries();
        setGalleries(data);
      } catch (error) {
        console.error('Failed to load galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGalleries();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery?')) {
      try {
        await deleteGallery(id);
        setGalleries(galleries.filter((gallery) => gallery.id !== id));
      } catch (error) {
        console.error('Failed to delete gallery:', error);
      }
    }
  };

  const filteredGalleries = galleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Galleries</h1>
        <Link href="/admin/galleries/new">
          <Button className="bg-green-500 hover:bg-green-600 text-black">
            <PlusCircle className="mr-2 h-4 w-4" /> New Gallery
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search galleries..."
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
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Edition</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGalleries.map((gallery) => (
                <TableRow key={gallery.id} className="border-b-gray-700">
                  <TableCell>{gallery.title}</TableCell>
                  <TableCell>{gallery.edition_id}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/galleries/${gallery.id}/edit`}>
                      <Button variant="outline" size="sm" className="mr-2 bg-gray-700 border-gray-600 hover:bg-gray-600">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(gallery.id)}
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
