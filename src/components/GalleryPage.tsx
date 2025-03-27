"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, X, Plus, Share2, Download, Heart, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import logo from '@/assets/images/taf-logo.png';

// Import your images
import streetArtImage from '@/assets/images/street-art.png';
import danceImage from '@/assets/images/dance.png';
import fashionImage from '@/assets/images/fashion.png';
import image4 from '@/assets/images/4.png';
import image5 from '@/assets/images/5.png';
import image6 from '@/assets/images/6.png';

const categories = [
  "All",
  "Events",
  "Fashion",
  "Dance",
  "Art",
  "Community"
];

interface ImageItem {
  id: number;
  imageUrl: any;
  title: string;
  category: string;
  photographer: string;
  date: string;
  likes: number;
  featured?: boolean;
}

const galleryImages: ImageItem[] = [
  {
    id: 1,
    imageUrl: streetArtImage,
    title: "Summer Block Party '23",
    category: "Events",
    photographer: "John Doe",
    date: "Aug 2023",
    likes: 342,
    featured: true
  },
  {
    id: 2,
    imageUrl: danceImage,
    title: "Urban Dance Battle",
    category: "Dance",
    photographer: "Jane Smith",
    date: "Sep 2023",
    likes: 129
  },
  {
    id: 3,
    imageUrl: fashionImage,
    title: "Fashion Show",
    category: "Fashion",
    photographer: "Mike Johnson",
    date: "Oct 2023",
    likes: 276
  },
  {
    id: 4,
    imageUrl: image4,
    title: "Street Art Festival",
    category: "Art",
    photographer: "Sarah Wilson",
    date: "Nov 2023",
    likes: 185,
    featured: true
  },
  {
    id: 5,
    imageUrl: image5,
    title: "Rooftop Vibes",
    category: "Events",
    photographer: "Alex Brown",
    date: "Dec 2023",
    likes: 156
  },
  {
    id: 6,
    imageUrl: image6,
    title: "Culture Night",
    category: "Community",
    photographer: "Chris Lee",
    date: "Jan 2024",
    likes: 267
  },
  // Duplicate images for demo purposes - replace with your actual images
  {
    id: 7,
    imageUrl: streetArtImage,
    title: "Community Showcase",
    category: "Community",
    photographer: "David Wang",
    date: "Feb 2024",
    likes: 198
  },
  {
    id: 8,
    imageUrl: danceImage,
    title: "Street Dance Competition",
    category: "Dance",
    photographer: "Lisa Chen",
    date: "Mar 2024",
    likes: 231
  },
  {
    id: 9,
    imageUrl: fashionImage,
    title: "Urban Apparel Exhibition",
    category: "Fashion",
    photographer: "Robert Kim",
    date: "Apr 2024",
    likes: 175,
    featured: true
  }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'featured' | 'full'>('grid');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLiked, setIsImageLiked] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);
  
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  const featuredImages = galleryImages.filter(img => img.featured);

  useEffect(() => {
    if (viewMode === 'featured' && featuredRef.current) {
      featuredRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [viewMode]);

  const openImageDetail = (image: ImageItem) => {
    setSelectedImage(image);
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentIndex(index);
    setViewMode('full');
    setIsImageLiked(false);
  };

  const closeImageDetail = () => {
    setSelectedImage(null);
    setViewMode('grid');
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (filteredImages.length <= 1) return;
    
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
    setIsImageLiked(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="text-white" />
              <span className="text-white font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Image 
                src={logo} 
                alt="Tell a Friend Logo" 
                width={32} 
                height={32} 
              />
              <span className="text-white font-bold">Gallery</span>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar - Shows when filter is toggled */}
      <div className={`bg-gray-800 transition-all duration-300 ${isFilterOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#e6446a] text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1 inline-flex">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                viewMode === 'grid' ? 'bg-[#69c2df] text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                viewMode === 'featured' ? 'bg-[#69c2df] text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setViewMode('featured')}
            >
              Featured
            </button>
          </div>
        </div>

        {/* Featured View */}
        {viewMode === 'featured' && (
          <div 
            ref={featuredRef}
            className="relative overflow-x-auto pb-8 hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex space-x-8 min-w-max">
              {featuredImages.map((image) => (
                <div 
                  key={image.id}
                  className="w-[80vw] max-w-4xl relative rounded-2xl overflow-hidden shadow-xl"
                  onClick={() => openImageDetail(image)}
                >
                  <div className="aspect-[16/9] w-full relative">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-white text-3xl font-bold mb-2">{image.title}</h2>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 mb-1">{image.photographer}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-[#fad11b]">{image.category}</span>
                            <span className="text-gray-400">{image.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Heart className="text-[#e6446a] mr-2" size={18} />
                          <span className="text-white">{image.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button 
                className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 ml-2 backdrop-blur-sm"
                onClick={() => featuredRef.current?.scrollBy({left: -400, behavior: 'smooth'})}
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button 
                className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 mr-2 backdrop-blur-sm"
                onClick={() => featuredRef.current?.scrollBy({left: 400, behavior: 'smooth'})}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="relative aspect-square group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openImageDetail(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-white font-bold line-clamp-1">{image.title}</h3>
                    <p className="text-[#fad11b] text-sm">{image.category}</p>
                  </div>
                </div>
                {image.featured && (
                  <div className="absolute top-2 right-2 bg-[#e6446a] text-white text-xs rounded-full px-2 py-1">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Full Screen View */}
        {viewMode === 'full' && selectedImage && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Full Image Nav */}
            <div className="flex justify-between items-center p-4 bg-black/60">
              <button 
                onClick={closeImageDetail}
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <div className="flex space-x-4">
                <button 
                  className={`text-white hover:text-[#e6446a] transition-colors duration-300 ${isImageLiked ? 'text-[#e6446a]' : ''}`}
                  onClick={() => setIsImageLiked(!isImageLiked)}
                >
                  <Heart size={24} />
                </button>
                <button className="text-white hover:text-[#69c2df] transition-colors duration-300">
                  <Share2 size={24} />
                </button>
                <button className="text-white hover:text-[#fad11b] transition-colors duration-300">
                  <Download size={24} />
                </button>
              </div>
            </div>
            
            {/* Full Image */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-full h-full md:w-auto md:h-auto md:max-w-4xl md:max-h-[80vh]">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Image Details */}
            <div className="bg-black/60 backdrop-blur-md p-4">
              <h2 className="text-white text-xl font-bold">{selectedImage.title}</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-300">{selectedImage.photographer}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="text-[#fad11b] mr-2">{selectedImage.category}</span>
                    <span>{selectedImage.date}</span>
                  </div>
                </div>
                <div className="flex items-center text-white">
                  <Heart className={`mr-1 ${isImageLiked ? 'text-[#e6446a]' : 'text-gray-400'}`} size={16} />
                  <span>{isImageLiked ? selectedImage.likes + 1 : selectedImage.likes}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add New Photo Button (For authorized users) */}
      <div className="fixed right-6 bottom-6">
        <button className="bg-[#69c2df] hover:bg-[#69c2df]/90 text-white p-4 rounded-full shadow-lg transition-colors duration-300">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default GalleryPage;