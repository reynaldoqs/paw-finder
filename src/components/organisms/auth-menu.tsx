import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms";
import { AuthMenuItems } from "../molecules";

export const AuthMenu = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={""} alt={""} />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AuthMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex gap-2">
      <Button asChild variant="ghost">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/login">Sign in</Link>
      </Button>
    </div>
  );
};
