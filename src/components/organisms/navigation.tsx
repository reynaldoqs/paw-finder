"use client";

import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../atoms";

type NavigationProps = {
  className?: string;
};

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  return (
    <NavigationMenu className={cn("hidden md:flex", className)}>
      <NavigationMenuList className="flex-wrap gap-1">
        <NavigationMenuItem>
          <Link href="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pets/lost" className={navigationMenuTriggerStyle()}>
            Lost
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pets/found" className={navigationMenuTriggerStyle()}>
            Found
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-3 py-3 sm:w-[210px] md:w-[310px]">
              <ListItem title="Report lost pet" href="/animals/lost">
                By uploading a photo, description, and last seen location so the
                community can help find it.
              </ListItem>
              <ListItem title="Report found pet" href="/animals/found">
                by uploading a photo, details, and location so we can help
                identify and notify the owner.
              </ListItem>
              <ListItem title="Search" href="/animals/search">
                Search for a lost or found pet by name, breed, or location.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const MobileNavigation: React.FC<NavigationProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn("md:hidden", className)}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
        </Button>
      </div>

      {isOpen && (
        <>
          {/* <button
            type="button"
            className="fixed inset-0 z-40 bg-black/10  md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
          /> */}
          <div className="fixed left-0 right-0 top-[60px] z-50 animate-in slide-in-from-top-2 md:hidden">
            <div className="mx-4 rounded-lg border border-border bg-background shadow-lg">
              asd
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
  return (
    <li {...props} className="hover:bg-accent p-4 rounded-sm">
      <NavigationMenuLink>
        <Link href={href}>
          <div className="text-sm leading-6 text-foreground font-semibold">
            {title}
          </div>
          <p className="text-muted-foreground line-clamp-3 text-xs leading-4">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
