"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import hoodie from '@/assets/images/hoodie.png';
import tshirt from '@/assets/images/tshirt.png';
import jacket from '@/assets/images/jacket.png';

const products = [
  {
    id: 1,
    name: "Fall '24 TAF Hoodie",
    price: "$89.99",
    category: "Hoodies",
    imageUrl: hoodie,
    colors: ["Black", "Gray", "Navy"],
    isNew: true
  },
  {
    id: 2,
    name: "5th Anniversary Cropped Tee",
    price: "$39.99",
    category: "T-Shirts",
    imageUrl: tshirt,
    colors: ["White", "Black", "Yellow"],
    isNew: false
  },
  {
    id: 3,
    name: "TAF Varsity Jacket",
    price: "$129.99",
    category: "Jackets",
    imageUrl: jacket,
    colors: ["Black", "Brown"],
    isNew: true
  }
];

const MerchandiseSection = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      className="bg-gray-900 py-20 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[#e6446a]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L17.515 10.485 18.93 11.9l7.9-7.9h-2.83zm5.656 0L23.172 12.485 24.586 13.9l7.9-7.9h-2.83zM20 0L0 20h2.83L20 2.828 37.17 20H40L20 0zm0 10.414L10.414 20h2.828L20 13.242 26.758 20h2.828L20 10.414zM30.485 20L20 30.485l-3.657-3.657-1.414 1.414L20 33.313l8.485-8.484-1.414-1.414L24.343 26.7z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Wear Your <span className="inline-block bg-gradient-to-r from-[#e6446c] to-[#e6446c] text-transparent bg-clip-text">Story</span>
          </h2>
          <p className="text-white text-xl mb-16">Premium urban streetwear for the culture</p>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e6446a]/20 to-blue-500/20 rounded-lg blur-xl group-hover:opacity-75 transition-opacity duration-300"></div>
              <Image
                src={products[activeProduct].imageUrl}
                alt={products[activeProduct].name}
                width={600}
                height={600}
                className="relative rounded-lg w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
              {products[activeProduct].isNew && (
                <div className="absolute top-4 right-4 bg-[#e6446a] text-black px-4 py-1 rounded-full text-sm font-bold">
                  New Release
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{products[activeProduct].name}</h3>
                <p className="text-white text-2xl font-bold mb-4">{products[activeProduct].price}</p>
                <p className="text-white">Available Colors:</p>
                <div className="flex gap-2 mt-2">
                  {products[activeProduct].colors.map((color) => (
                    <span key={color} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#e6446a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e6446a] transition-colors duration-300 relative overflow-hidden group">
                <span className="relative z-10">Add to Cart</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#e6446a] to-[#e6446a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              {/* Product Navigation */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setActiveProduct(index)}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      activeProduct === index 
                        ? 'bg-gray-800 border-2 border-[#e6446a]' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-full h-auto object-cover rounded"
                    />
                    <p className="text-sm text-gray-400 mt-2">{product.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection;