import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "../atoms";
import { AuthMenuDropdown } from "../molecules/auth-menu-dropdown";

export const AuthMenu = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <AuthMenuDropdown />
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
