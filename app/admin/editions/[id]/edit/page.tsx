"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEdition, updateEdition } from "@/lib/firestore";
import { uploadImage } from "@/lib/cloudinary";
import { Edition } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditEditionPage() {
  const [edition, setEdition] = useState<Edition | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [distanceKm, setDistanceKm] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadEdition = async () => {
        try {
          const data = await getEdition(id as string);
          setEdition(data);
          setTitle(data.title);
          setDate(data.date);
          setLocation(data.location);
          setDescription(data.description);
          setDistanceKm(data.distance_km);
          setImageUrl(data.image_url);
          setFeatured(data.featured);
        } catch (error) {
          console.error("Failed to load edition:", error);
        }
      };
      loadEdition();
    }
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to upload image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edition) return;

    try {
      const updatedEdition: Omit<Edition, "id"> = {
        title,
        date,
        location,
        summary: description, // Use description state for summary
        distance_km: distanceKm,
        hero_image_url: imageUrl, // Use imageUrl state for hero_image_url
        featured,
        slug: title.toLowerCase().replace(/ /g, "-"),
      };
      await updateEdition(edition.id, updatedEdition);
      router.push("/admin/editions");
    } catch (error) {
      console.error("Failed to update edition:", error);
    }
  };

  if (!edition) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Edition</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="number"
          placeholder="Distance (km)"
          value={distanceKm}
          onChange={(e) => setDistanceKm(Number(e.target.value))}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="bg-gray-700 border-gray-600 rounded-lg text-white"
        />
        {uploading && <p className="text-gray-400">Uploading...</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded image"
            className="max-w-xs rounded-lg"
          />
        )}
        <div className="flex items-center space-x-2 text-white">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(Boolean(checked))}
          />
          <label htmlFor="featured">Featured</label>
        </div>
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black"
        >
          Update Edition
        </Button>
      </form>
    </div>
  );
}
