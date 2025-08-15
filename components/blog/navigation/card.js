'use client'
import { useState, useMemo } from 'react';
import Link from 'next/link';

export function ActiveCard({ articles = [] }) {
  // Find the current/default article
  const currentIndex = useMemo(() => articles.findIndex(a => a?.current) || 0, [articles]);
  const [hoveredIndex, setHoveredIndex] = useState(currentIndex);

  return (
    <div className="relative w-full h-48 sm:h-96 overflow-hidden px-2 sm:px-0">
      <div className="absolute inset-0 flex justify-center items-center">
        {articles.map((article, i) => {
          const src = typeof article.thumbnail === 'string' 
            ? article.thumbnail 
            : article.thumbnail?.src;

          const isExpanded = hoveredIndex === i;

          return (
            <div
              key={article.url ?? `${article.title}-${i}`}
              className="relative mx-1 sm:mx-2"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(currentIndex)}
            >
              <Link href={article.url || '#'}>
                <div
                  className={`h-[200px] sm:h-[500px] transition-all duration-300 ease-in-out rounded-xl overflow-hidden relative bg-gray-200 shadow-md cursor-pointer ${
                    isExpanded ? 'w-[200px] sm:w-[500px] shadow-xl' : 'w-[60px] sm:w-[100px]'
                  }`}
                  style={{
                    backgroundImage: src ? `url(${src})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Title overlay */}
                  <div className={`absolute bottom-2 sm:bottom-14 right-0 font-spartan font-bold text-slate-600 text-xs sm:text-xl p-1 uppercase rounded-md rounded-br-md backdrop-blur-xl bg-gray-200 bg-opacity-40 pointer-events-none transition-opacity duration-200 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {article.title}
                  </div>
                  
                  {/* Hover indicator for collapsed cards */}
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="text-white text-xs sm:text-sm font-bold text-center px-2">
                        {article.title}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
