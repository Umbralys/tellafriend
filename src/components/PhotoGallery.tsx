"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Hash, User, Calendar } from 'lucide-react';
import streetArtImage from '@/assets/images/street-art.png';
import danceImage from '@/assets/images/dance.png';
import fashionImage from '@/assets/images/fashion.png';
import image4 from '@/assets/images/4.png';
import image5 from '@/assets/images/5.png';
import image6 from '@/assets/images/6.png';
import logo from '@/assets/images/taf-logo.png';

const galleryImages = [
  {
    id: 1,
    imageUrl: streetArtImage,
    title: "Summer Block Party '23",
    category: "Events",
    photographer: "John Doe",
    date: "Aug 2023",
    featured: true
  },
  {
    id: 2,
    imageUrl: danceImage,
    title: "Urban Dance Battle",
    category: "Dance",
    photographer: "Jane Smith",
    date: "Sep 2023"
  },
  {
    id: 3,
    imageUrl: fashionImage,
    title: "Fashion Show",
    category: "Fashion",
    photographer: "Mike Johnson",
    date: "Oct 2023"
  },
  {
    id: 4,
    imageUrl: image4,
    title: "Street Art Festival",
    category: "Art",
    photographer: "Sarah Wilson",
    date: "Nov 2023",
    featured: true
  },
  {
    id: 5,
    imageUrl: image5,
    title: "Rooftop Vibes",
    category: "Lifestyle",
    photographer: "Alex Brown",
    date: "Dec 2023"
  },
  {
    id: 6,
    imageUrl: image6,
    title: "Culture Night",
    category: "Events",
    photographer: "Chris Lee",
    date: "Jan 2024"
  }
];

// Rest of the component remains the same, but update the Image components to handle StaticImageData
const PhotoGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1d4d57] py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#fad11b]/80 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#eb4670]/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center mb-4">
  <Image 
    src={logo} 
    alt="Tell a Friend Logo"
    width={40}
    height={40}
    className="text-[#fad11b]"
  />
</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Captured <span className="text-white">Moments</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A visual journey through our community's most memorable experiences
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group transform transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${image.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div 
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setActiveImage(image.id)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center text-[#fad11b]">
                        <Hash size={16} className="mr-1" />
                        <span>{image.category}</span>
                      </div>
                      <div className="flex items-center text-[#69c2df]">
                        <User size={16} className="mr-1" />
                        <span>{image.photographer}</span>
                      </div>
                      <div className="flex items-center text-[#e6446a]">
                        <Calendar size={16} className="mr-1" />
                        <span>{image.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View */}
        {activeImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-6xl w-full">
              <div className="relative w-full aspect-video">
                <Image
                  src={galleryImages.find(img => img.id === activeImage)?.imageUrl || ''}
                  alt="Gallery Image"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
              <button 
                className="absolute top-4 right-4 text-white hover:text-[#69c2df] transition-colors duration-300"
                onClick={() => setActiveImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;