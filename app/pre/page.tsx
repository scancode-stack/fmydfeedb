'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: "Marketplace",
    description: "",
    imageSrc: "/images/marketplace.jpg",
    href: "/marketplace",
  },
  {
    title: "FMYD",
    description: "",
    imageSrc: "/images/fmys.jpg",
    href: "https://fmyd.gov.ng/",
  },
  {
    title: "YOPI TRACKER",
    description: "",
    imageSrc: "/images/tracker.jpg",
    href: "", // Handled conditionally below
  },
  {
    title: "Waste 2 Wealth",
    description: "",
    imageSrc: "/images/waste.jpg",
    href: "https://wastetowealth.fmyd.gov.ng/",
  },
  {
    title: "Youth Initiative",
    description: "",
    imageSrc: "/images/waste.jpg",
    href: "https://yid.fmyd.gov.ng/",
  },
  {
    title: "NIYA",
    description: "",
    imageSrc: "/images/waste.jpg",
    href: "https://niya.gov.ng/",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-28">
      
      {/* 1. Left-Aligned Image Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-26 bg-white border-b border-gray-100 px-4 py-2">
        {/* Adjusted max-w-5xl so the logo perfectly aligns with your card list below */}
        <div className="max-w-5xl mx-auto h-full flex items-center justify-start">
          
          {/* Logo Asset Container shifted Left */}
          <div className="relative w-48 h-24">
            <Image 
              src="/fmyd.png" 
              alt="International Civil Service Week" 
              fill 
              priority 
              className="object-contain object-left" 
              sizes="192px" 
            />
          </div>
          
        </div>
      </nav>

      {/* 2. Main Services Grid Container */}
      <main className="flex-grow max-w-5xl w-full mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, index) => {
            // Check if the link exists
            const hasLink = service.href.length > 0;

            return (
              <div 
                key={index} 
                className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 hover:border-black transition-all duration-200 hover:shadow-sm"
              >
                {/* Card Thumbnail and Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image 
                      src={service.imageSrc} 
                      alt={service.title} 
                      fill 
                      className="object-cover" 
                      sizes="48px" 
                    />
                  </div>
                  <h2 className="text-base font-bold text-gray-900 leading-tight">
                    {service.title}
                  </h2>
                </div>

                {/* Description Block */}
                {service.description && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {service.description}
                  </p>
                )}

                {/* Bottom Nav Text Link */}
                <div className="mt-auto pt-1">
                  {hasLink ? (
                    <Link 
                      href={service.href} 
                      target="_blank" 
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black transition-colors group/link"
                    >
                      Explore {service.title}
                      <span className="text-sm transition-transform group-hover/link:translate-x-0.5">→</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
