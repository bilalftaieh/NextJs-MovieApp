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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 animate-gradient-x">
      <span className="text-white text-2xl">{text}{dots}</span>
    </div>
  );
}