"use client";

import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type * as React from "react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
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
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 sm:w-[210px] md:w-[310px]">
              <ListItem title="Lost pets" href="/pets/lost">
                List of lost pets
              </ListItem>
              <ListItem title="Found pets" href="/pets/found">
                List of found pets
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-2 py-2 sm:w-[210px] md:w-[310px]">
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
          <FontAwesomeIcon icon={faBarsStaggered} />
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
    <li {...props} className="hover:bg-accent p-2 rounded-sm">
      <NavigationMenuLink asChild>
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
