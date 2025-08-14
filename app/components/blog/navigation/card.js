'use client'
import { useState } from 'react';
import Link from 'next/link';

export function ActiveCard({ articles = [] }) {
  // Find the current/default article
  const currentIndex = articles.findIndex(a => a?.current) || 0;
  const [hoveredIndex, setHoveredIndex] = useState(currentIndex);

  return (
    <div className="flex justify-center items-center gap-3 w-full h-96 overflow-hidden">
      {articles.map((article, i) => {
        const src = typeof article.thumbnail === 'string' 
          ? article.thumbnail 
          : article.thumbnail?.src;
        
        const isExpanded = hoveredIndex === i;

        return (
          <Link
            key={article.url ?? `${article.title}-${i}`}
            href={article.url || '#'}
            className="block relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(currentIndex)}
          >
            <div
              className={`h-[500px] transition-all duration-300 ease-in-out rounded-xl overflow-hidden relative bg-gray-200 shadow-md group-hover:shadow-xl ${
                isExpanded ? 'w-[500px] shadow-xl' : 'w-[100px] shadow-md'
              }`}
              style={{
                backgroundImage: src ? `url(${src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Title overlay */}
              <div className={`absolute bottom-14 right-0 font-spartan font-bold text-slate-600 text-xl p-1 uppercase rounded-md rounded-br-md backdrop-blur-xl bg-gray-200 bg-opacity-40 pointer-events-none transition-opacity duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}>
                {article.title}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
