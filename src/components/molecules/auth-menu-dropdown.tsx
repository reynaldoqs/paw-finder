"use client";

import type { User } from "@supabase/supabase-js";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms";
import { AuthMenuItems } from "./auth-menu-items";

type AuthMenuDropdownProps = {
  user: User;
};

export const AuthMenuDropdown: React.FC<AuthMenuDropdownProps> = ({ user }) => {
  const getInitials = (email: string) => {
    const name = email.split("@")[0];
    return name
      .split(/[._-]/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const userEmail = user.email || "";
  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    userEmail.split("@")[0];
  const userAvatar =
    user.user_metadata?.avatar_url || user.user_metadata?.picture || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer" size="lg">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-gray-800 text-white font-bold">
            {getInitials(userEmail)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3 min-w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <div className="px-3 py-3 mb-2 flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {getInitials(userEmail)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <AuthMenuItems />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
