"use client";

import { Calendar, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { AnimalForm } from "@/types";

type AnimalCardProps = {
  animal: Partial<AnimalForm> & {
    id?: string;
    imageUrl?: string;
  };
  className?: string;
  href?: string;
};

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  className,
  href,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    animal.imageUrl || null
  );

  React.useEffect(() => {
    if (!animal.imageFile?.[0]) {
      setImageUrl(animal.imageUrl || null);
      return;
    }

    // const url = URL.createObjectURL(animal.imageFile[0]);
    setImageUrl("");

    return () => {
      URL.revokeObjectURL("");
    };
  }, [animal.imageFile, animal.imageUrl]);

  const speciesColors = {
    dog: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    cat: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    rabbit: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
    "guinea pig": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    hamster: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    other: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  };

  const speciesColor =
    speciesColors[animal.specie as keyof typeof speciesColors] ||
    speciesColors.other;

  const CardContent = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        "border border-border/50 hover:border-border",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={animal.name || "Animal"}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">🐾</div>
              <p className="text-sm">No image</p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Species Badge */}
        {animal.specie && (
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm",
                speciesColor
              )}
            >
              {animal.specie}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Breed */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
            {animal.name || "Unknown"}
          </h3>
          {animal.breed && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {animal.breed}
            </p>
          )}
        </div>

        {/* Description */}
        {animal.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {animal.description}
          </p>
        )}

        {/* Info Grid */}
        <div className="space-y-2 text-sm">
          {animal.location && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{animal.location}</span>
            </div>
          )}

          {animal.lostDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
            </div>
          )}

          {animal.contactNumber && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{animal.contactNumber}</span>
            </div>
          )}
        </div>

        {/* Color Tag */}
        {animal.color && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Color:
              </span>
              <span className="text-xs font-semibold text-foreground">
                {animal.color}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};
