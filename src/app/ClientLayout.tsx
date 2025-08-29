'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const Firefly = dynamic(() => import('@/components/Firefly'), { ssr: false });
const StarsBackground = dynamic(() => import('@/components/StarsBackground'), { ssr: false });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <StarsBackground />
      {children}
      <Firefly />
      <style jsx global>{`
        /* Add a subtle gradient overlay for better text readability */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            rgba(var(--background-start-rgb), 0.8) 0%,
            rgba(var(--background-end-rgb), 0.6) 100%
          );
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
