"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { DropdownMenuItem } from "../atoms";

export const AuthMenuItems = () => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>;
};
