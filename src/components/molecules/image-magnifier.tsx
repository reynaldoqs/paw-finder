"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [smoothPosition, setSmoothPosition] = useState({
    x: width / 2,
    y: height / 2,
  });
  const [isHovering, setIsHovering] = useState(false);
  const targetPositionRef = useRef({ x: width / 2, y: height / 2 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();

      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      const clampedX = Math.max(
        circleRadius,
        Math.min(rawX, rect.width - circleRadius * 2)
      );
      const clampedY = Math.max(
        circleRadius,
        Math.min(rawY, rect.height - circleRadius * 2)
      );

      targetPositionRef.current = {
        x: clampedX,
        y: clampedY,
      };
    },
    [circleRadius]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (!isHovering) return;

    const smoothMove = () => {
      setSmoothPosition((prev) => {
        const dx = targetPositionRef.current.x - prev.x;
        const dy = targetPositionRef.current.y - prev.y;

        // Stop animation if movement is negligible
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return targetPositionRef.current;
        }

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
  }, [isHovering, easing]);

  return (
    <div
      className="hidden md:flex md:flex-1 md:justify-center md:pl-6 relative select-none items-center"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      role="presentation"
    >
      <div ref={imageContainerRef} className="relative select-none">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="blur-md object-contain select-none pointer-events-none"
          draggable={false}
          priority
        />
        <div
          className="absolute inset-0 overflow-hidden select-none"
          style={{
            clipPath: `circle(${circleRadius}px at ${smoothPosition.x}px ${smoothPosition.y}px)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain select-none pointer-events-none"
            draggable={false}
            priority
          />
        </div>
        <div
          className="absolute pointer-events-none select-none"
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
            className="text-foreground relative stroke-[2.5] select-none"
          />
        </div>
      </div>
    </div>
  );
};
