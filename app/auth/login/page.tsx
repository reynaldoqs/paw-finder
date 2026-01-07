import type { Metadata } from "next";
import { LoginForm } from "@/components/organisms/login-form";

export const metadata: Metadata = {
	title: "Login",
	description: "Sign in to your Paw Finder account",
	robots: {
		index: false,
		follow: false,
	},
};

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
