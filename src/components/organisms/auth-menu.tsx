import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getButtonStyles } from "../atoms";
import { AuthMenuDropdown } from "../molecules/auth-menu-dropdown";

export const AuthMenu = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  return user ? (
    <AuthMenuDropdown user={user} />
  ) : (
    <div className="flex gap-2">
      <Link href="/auth/sign-up" className={getButtonStyles()}>
        Sign up
      </Link>
      <Link
        href="/auth/login"
        className={getButtonStyles({ variant: "outline" })}
      >
        Sign in
      </Link>
    </div>
  );
};
