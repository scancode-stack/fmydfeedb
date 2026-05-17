'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: "Marketplace", description: "Buy and sell products from verified youth entrepreneurs", imageSrc: "/images/marketplace.jpg", href: "/marketplace", external: false },
  { title: "FMYD", description: "Federal Ministry of Youth Development", imageSrc: "/fmyd.png", href: "https://fmyd.gov.ng/", external: true },
  { title: "YOPI TRACKER", description: "", imageSrc: "/images/tracker.jpg", href: "", external: false },
  { title: "Waste 2 Wealth", description: "Transform waste into wealth opportunities", imageSrc: "/images/waste.jpg", href: "https://wastetowealth.fmyd.gov.ng/", external: true },
  { title: "Youth Initiative", description: "Youth Innovation and Development Programs", imageSrc: "/yid.jpeg", href: "https://yid.fmyd.gov.ng/", external: true },
  { title: "NIYA", description: "National Youth Investment Agency", imageSrc: "/niya.jpeg", href: "https://niya.gov.ng/", external: true },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-28">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-start">
          <div className="flex flex-col items-start">
            <div className="relative w-44 h-20">
              <Image src="/fmyd.png" alt="FMYD Logo" fill priority className="object-contain object-left" sizes="176px" />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl w-full mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const hasLink = service.href.length > 0;
            
            return hasLink ? (
              <Link
                key={index}
                href={service.href}
                target={service.external ? "_blank" : undefined}
                rel={service.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-black hover:shadow-lg transition-all h-full"
              >
                <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src={service.imageSrc} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-3 text-center group-hover:text-black">{service.title}</h2>
                
                {service.description && (
                  <p className="text-sm text-gray-600 mb-6 text-center line-clamp-3">{service.description}</p>
                )}
                
                <div className="mt-auto text-center text-sm font-semibold text-black group-hover:text-emerald-600">
                  Explore →
                </div>
              </Link>
            ) : (
              <div key={index} className="flex flex-col bg-white border-2 border-gray-200 rounded-2xl p-5 h-full">
                <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src={service.imageSrc} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">{service.title}</h2>
                
                {service.description && (
                  <p className="text-sm text-gray-600 mb-6 text-center">{service.description}</p>
                )}
                
                <div className="mt-auto text-center text-sm font-medium text-gray-400">Coming Soon</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}