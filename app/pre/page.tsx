'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: "Marketplace", description: "Buy and sell products from verified youth entrepreneurs", imageSrc: "/images/marketplace.jpg", href: "/marketplace", external: false },
  { title: "FMYD", description: "Federal Ministry of Youth Development", imageSrc: "/images/fmys.jpg", href: "https://fmyd.gov.ng/", external: true },
  { title: "YOPI TRACKER", description: "", imageSrc: "/images/tracker.jpg", href: "", external: false },
  { title: "Waste 2 Wealth", description: "Transform waste into wealth opportunities", imageSrc: "/images/waste.jpg", href: "https://wastetowealth.fmyd.gov.ng/", external: true },
  { title: "Youth Initiative", description: "Youth Innovation and Development Programs", imageSrc: "/images/waste.jpg", href: "https://yid.fmyd.gov.ng/", external: true },
  { title: "NIYA", description: "National Youth Investment Agency", imageSrc: "/images/waste.jpg", href: "https://niya.gov.ng/", external: true },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-28">
      <nav className="fixed top-0 left-0 right-0 z-50 h-26 bg-white border-b border-gray-100 px-4 py-2">
        <div className="max-w-5xl mx-auto h-full flex items-center justify-start">
          <div className="relative w-48 h-24">
            <Image src="/fmyd.png" alt="FMYD Logo" fill priority className="object-contain object-left" sizes="192px" />
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <Image src={service.imageSrc} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="56px" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-black">{service.title}</h2>
                </div>

                {service.description && (
                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                )}

                <div className="mt-auto text-sm font-semibold text-black group-hover:text-emerald-600">
                  Explore →
                </div>
              </Link>
            ) : (
              <div key={index} className="flex flex-col bg-white border-2 border-gray-200 rounded-2xl p-5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <Image src={service.imageSrc} alt={service.title} fill className="object-cover" sizes="56px" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{service.title}</h2>
                </div>

                {service.description && <p className="text-sm text-gray-600 mb-6">{service.description}</p>}

                <div className="mt-auto text-sm font-medium text-gray-400">Coming Soon</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}