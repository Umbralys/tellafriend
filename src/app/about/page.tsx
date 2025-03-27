"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Mic, Heart, Share2 } from 'lucide-react';
import logo from '@/assets/images/taf-logo.png';

// You can replace these with actual team member images
import teamMember1 from '@/assets/images/street-art.png'; 
import teamMember2 from '@/assets/images/dance.png';
import teamMember3 from '@/assets/images/fashion.png';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Creative Director",
      image: teamMember1,
      bio: "Started Tell a Friend to create a space where urban culture thrives through community and shared experiences."
    },
    {
      name: "Maya Rivera",
      role: "Events Manager",
      image: teamMember2,
      bio: "Curates our iconic events, bringing together artists, performers, and community members."
    },
    {
      name: "Jason Williams",
      role: "Brand Partnerships",
      image: teamMember3,
      bio: "Connects our community with brands that share our values and vision for urban culture."
    }
  ];
  
  const values = [
    {
      icon: <Users size={32} />,
      title: "Community First",
      description: "We believe in the power of bringing people together to create meaningful connections and experiences."
    },
    {
      icon: <Mic size={32} />,
      title: "Authentic Expression",
      description: "We provide a platform for genuine self-expression and celebrate the diversity of urban culture."
    },
    {
      icon: <Heart size={32} />,
      title: "Inclusive Experiences",
      description: "Our events and spaces are designed to welcome everyone, regardless of background or identity."
    },
    {
      icon: <Share2 size={32} />,
      title: "Spread The Word",
      description: "We're passionate about sharing the vibrant stories and talents within our community."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e6446a]/20 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-gray-900"></div>
        
        <div className="container mx-auto px-4 pt-20 pb-20 relative">
          <div className="flex flex-col items-center text-center">
            <Image 
              src={logo} 
              alt="Tell a Friend Logo" 
              width={100} 
              height={100} 
              className="mb-6"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-[#e6446a]">Story</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Tell a Friend is more than a brand—it's a movement celebrating urban culture through events, fashion, and community.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section ref={sectionRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our <span className="text-[#69c2df]">Mission</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  We started Tell a Friend with a simple vision: to create authentic connections through shared experiences. In an increasingly digital world, we believe in the power of in-person gatherings that celebrate creativity, diversity, and urban culture.
                </p>
                <p className="text-gray-300 mb-6">
                  Our events, merchandise, and community initiatives all serve one purpose: to bring people together and foster genuine relationships while promoting the vibrant culture that inspires us daily.
                </p>
                <p className="text-gray-300">
                  Through our platform, we aim to amplify diverse voices, showcase emerging talent, and create spaces where everyone feels welcome to express themselves authentically.
                </p>
              </div>
              <div className="order-1 md:order-2 bg-gradient-to-r from-[#e6446a]/10 to-[#69c2df]/10 p-1 rounded-xl">
                <div className="bg-gray-800 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-white mb-4">What We're About</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-[#e6446a]/20 p-2 rounded-full mr-3 mt-1">
                        <span className="text-[#e6446a]">01</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Curated Experiences</h4>
                        <p className="text-gray-400">Thoughtfully designed events that create lasting memories</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#fad11b]/20 p-2 rounded-full mr-3 mt-1">
                        <span className="text-[#fad11b]">02</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Urban Fashion</h4>
                        <p className="text-gray-400">Premium streetwear that tells your unique story</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#69c2df]/20 p-2 rounded-full mr-3 mt-1">
                        <span className="text-[#69c2df]">03</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Community Building</h4>
                        <p className="text-gray-400">Creating spaces for meaningful connections to flourish</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-[#fad11b]">Values</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do, from planning events to designing merchandise and building our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="text-[#e6446a] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The <span className="text-[#e6446a]">Team</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the passionate individuals behind Tell a Friend who work tirelessly to create memorable experiences and build our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#69c2df] mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#e6446a]/20 to-[#69c2df]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the <span className="text-[#fad11b]">Movement</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Want to collaborate, partner, or just learn more about what we do? We'd love to hear from you!
          </p>
          <a 
            href="mailto:hello@tellafriend.com" 
            className="inline-block bg-[#e6446a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e6446a]/90 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;