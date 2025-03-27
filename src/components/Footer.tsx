"use client";

import React from 'react';
import Image from 'next/image';
import { Instagram, Twitter, Facebook, Youtube, } from 'lucide-react';
import logo from '@/assets/images/taf-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, url: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: '#' },
    { name: 'Facebook', icon: <Facebook size={20} />, url: '#' },
    { name: 'Youtube', icon: <Youtube size={20} />, url: '#' },
  ];

  const quickLinks = [
    { name: 'About Us', url: '#' },
    { name: 'Events', url: '#' },
    { name: 'Shop', url: '#' },
    { name: 'Community', url: '#' },
    { name: 'Only Friends', url: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms of Service', url: '#' },
    { name: 'Cookie Policy', url: '#' },
    { name: 'Disclaimer', url: '#' }
  ];

  const serviceLinks = [
    { name: 'Event Planning', url: '#' },
    { name: 'Brand Partnerships', url: '#' },
    { name: 'Marketing Services', url: '#' },
    { name: 'Content Creation', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Image 
                src={logo} 
                alt="Tell a Friend Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10"
              />
              <span className="text-white font-bold text-xl">Tell a Friend</span>
            </div>
            <p className="text-gray-400 text-sm">
              Creating memorable experiences and fostering authentic connections within our urban community.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-[#69c2df] transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-[#e6446a] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-[#fad11b] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive content.</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#69c2df]"
              />
              <button
                type="submit"
                className="w-full bg-[#69c2df] text-white px-6 py-2 rounded-full font-bold hover:bg-[#69c2df]/90 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} Tell a Friend. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;