'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 24;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/drawings');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 w-full">
        {currentImages.map((src, index) => (
          <div key={indexOfFirstImage + index} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={`Drawing ${indexOfFirstImage + index + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
              priority={index < 8}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 py-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 disabled:hidden hover:text-red-500 hover:underline"
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(num => {
              return (
                num === 1 ||
                num === totalPages ||
                (num >= currentPage - 1 && num <= currentPage + 1)
              );
            })
            .map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 ${
                  currentPage === number
                    ? 'text-red-500 underline'
                    : 'hover:text-red-500 hover:underline'
                }`}
              >
                {number}
              </button>
            ))}
        </div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 disabled:hidden hover:text-red-500 hover:underline"
        >
          Next
        </button>
      </div>
    </div>
  );
}