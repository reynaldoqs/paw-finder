"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageMagnifierProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  circleRadius?: number;
  easing?: number;
};

export const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  width,
  height,
  circleRadius = 50,
  easing = 0.15,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const smoothMove = () => {
      setSmoothPosition((prev) => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;

        return {
          x: prev.x + dx * easing,
          y: prev.y + dy * easing,
        };
      });

      animationFrameRef.current = requestAnimationFrame(smoothMove);
    };

    animationFrameRef.current = requestAnimationFrame(smoothMove);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, easing]);

  return (
    <div
      className="hidden md:flex md:flex-1 md:justify-center md:pl-6 relative"
      onPointerMove={handlePointerMove}
      role="presentation"
    >
      <div ref={imageContainerRef} className="relative">
        <Image
          src={src}
          alt={alt}
          objectFit="contain"
          width={width}
          height={height}
          className="blur-md"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `circle(${circleRadius}px at ${smoothPosition.x}px ${smoothPosition.y}px)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            objectFit="contain"
            width={width}
            height={height}
          />
        </div>
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${smoothPosition.x - circleRadius}px`,
            top: `${smoothPosition.y - circleRadius}px`,
          }}
        >
          <Search
            style={{
              width: `${circleRadius * 3}px`,
              height: `${circleRadius * 3}px`,
              translate: `-${circleRadius * 0.4}px -${circleRadius * 0.4}px`,
            }}
            className="text-foreground relative stroke-[2.5]"
          />
        </div>
      </div>
    </div>
  );
};
