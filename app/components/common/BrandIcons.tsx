import React from 'react';

export const TrustIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props} aria-label="Trust">
    <rect x="4" y="8" width="32" height="24" rx="8" fill="#10b981" fillOpacity="0.12" />
    <path d="M20 30c6-2.5 10-7.5 10-13.5V10l-10-4-10 4v6.5C10 22.5 14 27.5 20 30Z" fill="#10b981"/>
    <path d="M16.5 19.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DeliveryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props} aria-label="Delivery">
    <rect x="4" y="8" width="32" height="24" rx="8" fill="#2563eb" fillOpacity="0.12" />
    <rect x="10" y="18" width="14" height="8" rx="2" fill="#2563eb" />
    <rect x="24" y="20" width="6" height="6" rx="1.5" fill="#2563eb" />
    <circle cx="14" cy="28" r="2" fill="#2563eb" />
    <circle cx="28" cy="28" r="2" fill="#2563eb" />
  </svg>
);

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props} aria-label="Star">
    <rect x="4" y="8" width="32" height="24" rx="8" fill="#f59e0b" fillOpacity="0.12" />
    <path d="M20 13l2.47 5.01 5.53.8-4 3.9.94 5.5L20 25.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L20 13Z" fill="#f59e0b"/>
  </svg>
);

export const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props} aria-label="Email">
    <rect x="4" y="8" width="32" height="24" rx="8" fill="#2563eb" fillOpacity="0.12" />
    <rect x="10" y="16" width="20" height="12" rx="3" fill="#2563eb" />
    <path d="M10 16l10 7 10-7" stroke="#fff" strokeWidth={2} strokeLinejoin="round"/>
  </svg>
);

export const FabricIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props} aria-label="Fabric">
    <rect x="4" y="8" width="32" height="24" rx="8" fill="#10b981" fillOpacity="0.12" />
    <rect x="12" y="14" width="16" height="12" rx="4" fill="#10b981" />
    <path d="M16 18c2 2 6 2 8 0" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
  </svg>
); 