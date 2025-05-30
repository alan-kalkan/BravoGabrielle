'use client'

import Image from 'next/image'

interface MarqueeProps {
  speed?: number // seconds per iteration
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({
  speed = 20,
  direction = 'left',
  className = '',
}: MarqueeProps) {
  // Sample images - replace these with your actual content
  const images = [
    '/bg/background.jpeg',
    '/bg/background.jpeg',
  ]

  const marqueeContent = (
    <div className="flex gap-4 items-center">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-[200px] h-[100px] flex-shrink-0"
        >
          <Image
            src={src}
            alt={`Marquee item ${index + 1}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}
    >
      <div 
        className={`inline-flex animate-marquee`}
        style={{
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationDuration: `${speed}s`
        }}
      >
        {/* Repeat the content multiple times to ensure seamless loop */}
        {marqueeContent}
        {marqueeContent}
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  )
} 