'use client'
import { useEffect, useState } from 'react';

export default function LoadingDisplay({ text }: { text: string }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-custom-one-light 
    via-custom-one to-custom-one-dark animate-gradient-x">
      <span className="text-white text-2xl">{text}{dots}</span>
    </div>
  );
}